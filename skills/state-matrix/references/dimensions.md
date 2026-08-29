# The six dimensions

Sweep each against each surface. Most yield one or two states; some yield none. A dimension with nothing to say is reported empty, never padded.

## 1. Data — how much, and how good

| Value | The question | Typically forgotten |
|---|---|---|
| None | What does a surface with nothing on it show? | The difference between "nothing yet" and "nothing matches" |
| One | Does a list of one look broken? | Single-item layouts that were designed as grids |
| A few | The designed case | — |
| Many | What happens past the fold? | Pagination that was never decided |
| Far too many | Ten times the expected volume | Performance, and whether the surface is still usable |
| Malformed | A field is null, a name is a single character, a date is impossible | Rendering that assumes the shape is always right |
| Stale | Shown from cache, changed underneath | Whether the user is told, or silently acts on old data |

## 2. Lifecycle — where in the request

Initial · loading · loaded · refreshing · partial · failed · timed out · retrying.

**Partial** is the one that gets skipped: half the data arrived, the rest failed. It is not loading and it is not failed, and it happens constantly on surfaces that call two services.

**Refreshing** differs from **loading** — one has content to keep on screen, the other does not. Designing only one of them produces a surface that flashes empty on every refresh.

## 3. Permission and identity — who is asking

Signed out · signed in without the right · restricted by policy or plan · expired mid-action · acting in a different context (another account, company, delegated role).

**Expired mid-action** is the expensive one: the person filled in a form, the session died, and what happens to their input is a decision nobody made.

**Acting in a different context** matters wherever one person can act for more than one account. What was visible a moment ago may not be now, and the surface has to survive the switch.

## 4. Content stress — the material nobody designed against

Shortest · longest · duplicate · zero · negative · very large number · missing optional field · another script or writing direction.

**Duplicate** deserves its own row wherever items are identified by a human-supplied name. Two entries that look identical and are not is a class of error users cannot recover from, because they cannot see the difference to begin with.

**Longest** needs a rule, not a hope: truncate, wrap, shrink, or reflow. "It will be fine" is how a name becomes an ellipsis at the worst moment.

## 5. Environment — the device and the conditions

Smallest supported viewport · largest text setting · no network · slow network · backgrounded and returned · reduced motion · dark mode.

**Largest text setting** breaks more layouts than small screens do, and it is the one accessibility state most likely to be legally required.

**Backgrounded and returned** matters most mid-transaction: the OS killed the process, the user comes back, and what they find is a decision.

## 6. Time — where in the relationship

First ever use · returning · after a long absence · interrupted mid-flow · the same account active elsewhere.

**First ever use** and **empty** are different states that look alike. One is an invitation; the other is a report.

**After a long absence** catches surfaces whose content ages: an old draft, an expired offer, a saved item that no longer exists.

## Where the dimensions interact

Combinations earn a row only when together they produce a screen neither produces alone. The ones that reliably do:

- **Data none + Time first-use** vs **Data none + Time returning** — invitation versus confirmation
- **Lifecycle failed + Environment offline** vs **failed + server error** — one is retryable by the user, the other is not
- **Permission expired + Lifecycle loading** — the session died while a request was in flight; whose error is that
- **Data stale + Lifecycle loaded** — content is on screen and wrong, with nothing indicating it
- **Content longest + Environment largest text** — the two stresses compound and this is where layouts actually break

Three-way combinations are almost never worth a row. If you are writing one, the surface is probably doing too much.
