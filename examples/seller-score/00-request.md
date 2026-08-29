# Request — Seller Performance Score v2

**From:** Deniz Aksoy — Category Management
**To:** Marketplace Core
**Date:** 30.08.2026

## Where we are

A seller's score on Menzil is shown out of 5 today, and it is **nothing but the simple average of product reviews over the last 12 months**. That hurts us twice:

- Sellers who ship on time and never cancel get a low score because of bad reviews about the product. The review belongs to the product; the score lands on the seller.
- Most customer complaints are about delivery, and delivery is not in the score at all.

## What we want

Score v2 should be made of three components:

- **Delivery performance** (on-time delivery rate) — 50%
- **Cancellation rate** (seller-caused cancellations) — 30%
- **Product reviews** — 20%

The window should be the **last 90 days**, not 12 months. The score should be **recalculated every night**.

## What we expect

- The seller panel should show the components separately so a seller knows what to fix
- **A seller whose score drops below 4.0 cannot enter campaigns.** There is no such rule today; it comes with this
- Storefront ranking should use the new score — it already uses the current one
- Sellers should have a right of appeal; legal is clear about this

## Scope

All sellers. No distinction by category.

## Timing

Live before the new year campaign. The campaign seller list freezes on 15 November.

## Notes

- We have not discussed what happens to the old scores
- Measurement (what the score change did to sales) is separate work, with the data team
- The seller score also appears in the mobile app, but that is another team and they have been told
