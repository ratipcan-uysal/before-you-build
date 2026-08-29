# The ten dimensions

Trace each against the change. Most yield one or two dependents; some yield none, and a dimension with nothing to say is reported empty rather than padded.

## Found by looking

**1. Direct consumers** — what reads, calls, or renders this today. The screens, the services, the jobs. A codebase search finds these, and everyone remembers them.

**2. Indirect consumers** — what reads something *derived* from it. The report that groups by a field computed from this one; the cache warmed by this call; the feature that keys off a flag this rule sets. Two hops out is where the incidents live, and two hops is usually one hop further than anyone looked.

**3. Published contracts** — anything with a shape someone else built against: an API response, an event payload, an export file, a webhook, a database view another team queries. Ask whether the shape changes, and separately whether the *meaning* changes while the shape holds — the second is silent by construction.

## Found by asking

**4. Stored data written under the old rule** — rows that exist now and were correct under the previous behaviour. After the change, are they wrong, ambiguous, or fine? A rule change usually leaves history behind it, and history is what reports read.

**5. Work in flight** — anything mid-process when the change lands. A half-finished flow, a queued job, a scheduled item, a session that started under the old rule. Deployment is not a moment; it is a window with people inside it.

**6. Reporting and analytics** — dashboards, funnels, cohort definitions, finance reconciliation, anything feeding a model. This dimension is almost entirely **silent** breakage: numbers keep arriving and quietly mean something else. Ask who compares this month to last month, and whether the comparison survives.

**7. Automation and alerting** — scheduled jobs, alert thresholds tuned to old volumes, integrations, partner webhooks, retries. An alert calibrated to old behaviour either stops firing or starts screaming, and both are how a change discredits its own monitoring.

**8. Human process** — support scripts, training material, runbooks, onboarding docs, the sentence an agent says on the phone. Not in the repository, not in the ticket, and the reason a change lands correctly and the call centre gets it wrong for a fortnight.

**9. Other teams' assumptions** — anyone who built on the current behaviour without a contract saying they could. Usually discovered by announcing the change rather than by searching for it, which is itself the recommendation.

**10. Clients that will not update** — old app versions, cached web bundles, embedded integrations, a partner on a version from last year. Ask what the oldest supported version does with the new behaviour, and what it does if it never learns about it.

## Working them well

- **Two hops, then stop.** One hop is what everyone already listed. Three hops is a map of the company. The value is concentrated at two.
- **Ask who compares over time.** Any dependent that compares a period to a previous period is silently broken by any change of meaning, even when nothing about it changes.
- **Announcement is a tracing tool.** Dimensions 8 and 9 are found by telling people what you are about to change and waiting a day, not by searching. Recommend it as a step, with a date.
- **A dimension with nothing to say gets a line saying so.** Padding a radius is how a reader learns to skim it, and the one real row is on the page they skimmed.
