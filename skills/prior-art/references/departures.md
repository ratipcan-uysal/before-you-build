# The three kinds of departure

Each has a different owner, a different cost, and a different question. Sorting them is most of the work; a flat list of "things that are different" is not usable by anyone.

## Mechanism — the *how* is different

The work uses a different channel, sequence or handshake to achieve the same end.

**Where it comes from:** a request that describes a solution. *"An SMS goes out, they tap the link, a code appears"* is a mechanism; the requirement underneath is smaller and admits other answers.

**Why it matters:** a mechanism drags its own failure paths, its own secrets and its own surfaces behind it. Every one of those has been carried through the whole chain by the time anyone notices, and all of them leave together if the mechanism changes.

**The question:** *"Everything documented does this the other way round — deliberate?"*

**Owner:** whoever wrote the request. They usually have a reason, and it is usually one sentence long and not written down anywhere.

## Constraint — you forbid or require something the field does not

The work imposes a rule that comparable things treat as configurable, or permits something they treat as fixed.

**Where it comes from:** a design brief, a security review, a compliance conversation. Constraints accrete and nobody records which ones are load-bearing.

**Why it matters:** a constraint nobody else imposes is either an insight about this context or an assumption nobody examined, and **from the inside those look identical.** The deliberate one is answered in a sentence. The accidental one has usually made something else impossible.

**The question:** *"This product lets the host override that; you forbid it. Is the cost known?"*

**Owner:** whoever set it. If nobody can be named, that is the finding.

## Capability — the work assumes something can be done

A decision rests on a platform, vendor, standard or regulation behaving a particular way, and nobody confirmed it.

**Where it comes from:** everywhere. It is the kind that survives furthest, because it reads as a fact rather than a decision.

**Why it matters:** it is the only one of the three that can be **settled** rather than discussed. One documentation page ends the argument, and the argument would otherwise run until somebody builds it.

**The question:** *"The platform documentation says this combination is not supported. Which half goes?"*

**Owner:** nobody, usually — which is the point. Capability assumptions have no owner because everyone assumed someone else had checked.

## Ranking them

Close on the two or three that would change the **shape** of the work rather than its detail. In order of how often they matter:

1. **Capability** first when one exists, because it can be settled today and may remove a decision entirely.
2. **Mechanism** next, because changing one removes whole branches of everything downstream.
3. **Constraint** last, and most of them stay. Ask about the ones with no nameable owner.
