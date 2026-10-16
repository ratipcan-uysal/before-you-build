"""Portable delivery contracts and coverage checks. No network or dependencies.

The BYB schema subset is intentionally explicit; it is not a full OpenAPI or
JSON Schema implementation. Unknown schema keywords fail rather than being ignored.
"""
import hashlib
import json
import math

CATEGORIES = {"happy", "alternative", "error", "boundary", "permission", "recovery"}
OPTIONAL = {"design", "flow", "data", "api", "contract", "risk"}
MANDATORY = {"request", "scope", "acceptance", "handoff"}


def check(ok, message):
    if not ok:
        raise ValueError(message)


def keys(value, required, optional=()):
    check(isinstance(value, dict), "expected an object")
    check(set(required) <= set(value) <= set(required) | set(optional), "invalid object fields: expected " + ",".join(sorted(required)))


def word(value):
    check(isinstance(value, str) and bool(value.strip()), "expected nonempty text")
    return value


def array(value, nonempty=False):
    check(isinstance(value, list) and (not nonempty or bool(value)), "expected a list" + (" with entries" if nonempty else ""))
    return value


def strings(value, nonempty=False):
    array(value, nonempty)
    for item in value:
        word(item)
    check(len(value) == len(set(value)), "duplicate references")
    return value


def indexed(value):
    array(value, True)
    found = set()
    for item in value:
        check(isinstance(item, dict), "expected record object")
        identifier = word(item.get("id"))
        check(identifier not in found, "duplicate id: " + identifier)
        found.add(identifier)
    return found


def schema_valid(schema, depth=0):
    check(depth < 16, "schema nesting too deep")
    keys(schema, {"type"}, {"properties", "required", "additionalProperties", "items", "enum", "minimum", "maximum", "minLength", "maxLength", "description"})
    typ = schema["type"]
    word(typ)
    check(typ in {"object", "array", "string", "integer", "number", "boolean", "null"}, "unsupported schema type")
    if "description" in schema:
        word(schema["description"])
    if typ == "object":
        check(isinstance(schema.get("properties"), dict), "object schema requires properties")
        strings(schema.get("required", []))
        check(set(schema.get("required", [])) <= set(schema["properties"]), "required property is undefined")
        check(type(schema.get("additionalProperties", False)) is bool, "additionalProperties must be boolean")
        for name, child in schema["properties"].items():
            word(name)
            schema_valid(child, depth + 1)
    else:
        check(not ({"properties", "required", "additionalProperties"} & set(schema)), "object keywords on non-object schema")
    if typ == "array":
        check("items" in schema, "array requires items")
        schema_valid(schema["items"], depth + 1)
    else:
        check("items" not in schema, "items on non-array schema")
    for low, high, types in (("minimum", "maximum", {"number", "integer"}), ("minLength", "maxLength", {"string"})):
        if low in schema or high in schema:
            check(typ in types, "constraint on wrong type")
            for name in (low, high):
                if name in schema:
                    check(type(schema[name]) in {int, float}, "constraint must be numeric")
                    check(type(schema[name]) is int or math.isfinite(schema[name]), "constraint must be finite")
                    if name.endswith("Length"):
                        check(type(schema[name]) is int and schema[name] >= 0, "length must be a nonnegative integer")
            check(low not in schema or high not in schema or schema[low] <= schema[high], "inverted schema bounds")
    if "enum" in schema:
        array(schema["enum"], True)
        without_enum = {k: v for k, v in schema.items() if k != "enum"}
        for value in schema["enum"]:
            instance_valid(value, without_enum)


def instance_valid(value, schema, location="example"):
    typ = schema["type"]
    valid = {"object": isinstance(value, dict), "array": isinstance(value, list),
             "string": isinstance(value, str), "integer": type(value) is int,
             "number": type(value) in {int, float}, "boolean": type(value) is bool, "null": value is None}[typ]
    check(valid, location + ": wrong type")
    if typ in {"number", "integer"}:
        check(type(value) is int or math.isfinite(value), location + ": non-finite value")
    if "enum" in schema:
        check(any(type(value) is type(item) and value == item for item in schema["enum"]), location + ": outside enum")
    if typ == "object":
        check(set(schema.get("required", [])) <= set(value), location + ": missing required fields")
        if not schema.get("additionalProperties", False):
            check(set(value) <= set(schema["properties"]), location + ": unknown fields")
        for name, child in schema["properties"].items():
            if name in value:
                instance_valid(value[name], child, location + "." + name)
    if typ == "array":
        for i, item in enumerate(value):
            instance_valid(item, schema["items"], location + "[" + str(i) + "]")
    for key, actual, compare in (("minimum", value, lambda a, b: a >= b), ("maximum", value, lambda a, b: a <= b),
                                 ("minLength", len(value) if typ == "string" else 0, lambda a, b: a >= b),
                                 ("maxLength", len(value) if typ == "string" else 0, lambda a, b: a <= b)):
        if key in schema:
            check(compare(actual, schema[key]), location + ": violates " + key)


def validate(kind, data):
    check(kind in {"request", "flow", "acceptance", "contract"}, "structured contract not supported for this kind")
    collection = {"request": "requirements", "flow": "steps", "acceptance": "scenarios", "contract": "operations"}[kind]
    required = {"schema", collection}
    if kind == "acceptance":
        required.add("coverage_decisions")
    if kind == "contract":
        required |= {"protocol", "open_questions"}
    keys(data, required)
    check(data["schema"] == "byb." + kind + ".v1", "unknown structured contract version")
    indexed(data[collection])
    for item in data[collection]:
        if kind == "request":
            keys(item, {"id", "statement", "critical", "evidence"})
            word(item["statement"])
            check(type(item["critical"]) is bool, "critical must be boolean")
            array(item["evidence"], True)
        elif kind == "flow":
            keys(item, {"id", "description", "kind", "requirements"})
            word(item["description"])
            word(item["kind"])
            check(item["kind"] in {"happy", "branch", "error"}, "unknown step kind")
            strings(item["requirements"], True)
        elif kind == "acceptance":
            keys(item, {"id", "requirements", "flow_steps", "category", "given", "when", "then", "status", "open_questions"})
            strings(item["requirements"], True)
            strings(item["flow_steps"])
            strings(item["given"], True)
            word(item["when"])
            strings(item["then"], True)
            word(item["category"])
            word(item["status"])
            check(item["category"] in CATEGORIES, "unknown scenario category")
            check(item["status"] in {"SPECIFIED", "BLOCKED"}, "unknown scenario status")
            strings(item["open_questions"])
            check(item["status"] != "SPECIFIED" or not item["open_questions"], "specified scenario has open questions")
        else:
            keys(item, {"id", "name", "requirements", "flow_steps", "request_schema", "response_schema", "errors",
                        "authorization", "idempotency", "consistency", "timeout", "compatibility", "error_policy", "examples"})
            for name in ("name", "authorization", "idempotency", "consistency", "timeout", "compatibility", "error_policy"):
                word(item[name])
            strings(item["requirements"], True)
            strings(item["flow_steps"], True)
            schema_valid(item["request_schema"])
            schema_valid(item["response_schema"])
            array(item["errors"])
            codes = set()
            for error in item["errors"]:
                keys(error, {"code", "meaning", "retryable", "status", "response_schema", "example"})
                code = word(error["code"])
                check(code not in codes, "duplicate error code")
                codes.add(code)
                word(error["meaning"])
                word(error["status"])
                check(type(error["retryable"]) is bool, "retryable must be boolean")
                schema_valid(error["response_schema"])
                instance_valid(error["example"], error["response_schema"], item["id"] + " error " + code)
            for example in array(item["examples"], True):
                keys(example, {"request", "response"})
                instance_valid(example["request"], item["request_schema"], item["id"] + " request example")
                instance_valid(example["response"], item["response_schema"], item["id"] + " response example")
    if kind == "acceptance":
        seen = set()
        for entry in array(data["coverage_decisions"], True):
            keys(entry, {"category", "applicable", "rationale"})
            word(entry["category"])
            check(entry["category"] in CATEGORIES and entry["category"] not in seen, "invalid coverage category")
            seen.add(entry["category"])
            check(type(entry["applicable"]) is bool, "applicable must be boolean")
            word(entry["rationale"])
        check(seen == CATEGORIES, "coverage decisions must address all scenario categories")
    if kind == "contract":
        word(data["protocol"])
        check(data["protocol"] in {"http", "event", "rpc"}, "unsupported protocol; do not guess one")
        strings(data["open_questions"])
    return data


def coverage(request, flow, acceptance, contract=None):
    validate("request", request)
    validate("acceptance", acceptance)
    reqs = {r["id"] for r in request["requirements"]}
    steps = set()
    errors = []
    if flow:
        validate("flow", flow)
        steps = {s["id"] for s in flow["steps"]}
        for step in flow["steps"]:
            if not set(step["requirements"]) <= reqs:
                errors.append("flow references unknown requirements: " + step["id"])
    covered_reqs, covered_steps, covered_categories = set(), set(), set()
    for scenario in acceptance["scenarios"]:
        if not set(scenario["requirements"]) <= reqs or not set(scenario["flow_steps"]) <= steps:
            errors.append("scenario has unknown trace references: " + scenario["id"])
        if scenario["status"] == "SPECIFIED":
            covered_reqs.update(scenario["requirements"])
            covered_steps.update(scenario["flow_steps"])
            covered_categories.add(scenario["category"])
        else:
            errors.append("scenario is BLOCKED: " + scenario["id"])
    for entry in acceptance["coverage_decisions"]:
        if entry["applicable"] and entry["category"] not in covered_categories:
            errors.append("applicable category has no specified scenario: " + entry["category"])
        if not entry["applicable"] and entry["category"] in covered_categories:
            errors.append("scenario contradicts category exclusion: " + entry["category"])
    for identifier in sorted(reqs - covered_reqs):
        errors.append("requirement has no specified acceptance: " + identifier)
    for identifier in sorted(steps - covered_steps):
        errors.append("flow step has no specified acceptance: " + identifier)
    if contract:
        validate("contract", contract)
        if contract["open_questions"]:
            errors.append("contract contains open questions")
        for op in contract["operations"]:
            if not set(op["requirements"]) <= reqs or not set(op["flow_steps"]) <= steps:
                errors.append("operation has unknown trace references: " + op["id"])
    return {"requirements": len(reqs), "covered_requirements": len(reqs & covered_reqs),
            "flow_steps": len(steps), "covered_flow_steps": len(steps & covered_steps), "errors": errors}


def fingerprint(state):
    material = {k: state[k] for k in ("id", "revision", "source_epoch", "context_revision", "sources", "questions", "decisions", "artifacts", "profiles", "consultations")}
    return hashlib.sha256(json.dumps(material, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
