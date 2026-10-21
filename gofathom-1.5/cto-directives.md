# GoFathom 1.5 — Live CTO Directives & Autonomous Engineering Feed

**Updated At**: `2026-10-22T02:51:00+05:30`  
**Reviewed Board Revision**: `1584` (`KIMI-R13-RESULTS.html`)  
**Current Gate Status**: `GF1-TST-B` (`changes requested` — `R13` scored `2 FULL [A1, A2] / 3 PARTIAL [B1, C1, C2] / 1 FAIL [B2]`)  
**CTO Verdict on R10 → R13 Trajectory**: **`ACTION REQUIRED — STOP PAID RUNS ON SCHEMA PLACEMENT REJECTIONS`**

---

## 1. Root Cause of the 6-Hour Stall (`R10` → `R12` → `R13`)

Over the last 6 hours (`Board Rev 1529 → 1584`), the engineering loop spent three consecutive cycles (`R10`, `R12`, `R13`, ~$2.00 in provider calls + hours of multi-round freezes) chasing **self-inflicted JSON schema rejections in the answer selector** while the actual database state and arithmetic were already right:
- In **`R12`**, `B1` was rejected as `FAIL` solely because Kimi returned **4 answer selections** against a rigid **3-part schema cap**.
- In **`R13`**, after fixing `B1`, **`B2` was rejected as `FAIL` solely because Kimi placed `"note": true` nested inside a selection object instead of at the JSON root**—throwing away an already-admitted `17.6 kg` correction (`replacing 18.4 kg`) and `2.4 kg` outstanding balance!
- Meanwhile, **`C2`** has been `PARTIAL` across `R10`, `R12`, and `R13` for the exact same reason: the vendor's `"remaining 1 kg tomorrow"` promise is extracted and stored in `unresolved_notes`, but omitted from the final answer whenever the model omits an optional target link.

---

## 2. Mandatory Offline Fixes Before Any `R14` Paid Run (`$0` Provider Spend)

Do **NOT** enable paid policies or run `R14` until the following **3 deterministic changes** are implemented and proven by re-rendering the **saved `R13` database and raw response snapshots** (`6/6 FULL` on saved `R13` state):

### Fix 1 — Forgiving Selection Parser & Decoupled Copy-Note Trigger (`Fixes B2 FAIL`)
- **Rule**: A valid business state (`17.6 kg` received, `2.4 kg` outstanding) must **never** fail delivery because of where a boolean presentation flag (`note: true`) sits in JSON.
- **Implementation**:
  1. In the answer-selection normalizer/validator, if `"note": true` appears inside *any* element of `selections[]`, hoist it to root `note: true` and strip the extra property before strict schema validation (or generate the copy-ready supplier note deterministically whenever the query asks for a supplier/shortage note or has an active discrepancy).
  2. Replay the exact captured `R13 B2` raw model output (`4,646 input / 322 output`) through the updated normalizer and verify that `B2` renders `FULL` (`17.6 kg` accepted, `2.4 kg` outstanding, scale-error context, and copy-ready note) with `0` provider calls.

### Fix 2 — Deterministic Bounded Unlinked-Note Disclosure by `(outlet_id, time_window)` (`Fixes C2 PARTIAL` & `B1 PARTIAL`)
- **Rule**: As Claude's `R13` review noted, optional model context links cannot be the sole gate for mandatory disclosure.
- **Implementation**:
  1. In the deterministic composer's mandatory disclosure floor (`GF1-TST-B-R4`), query all `unresolved_notes` / `raw_evidence` context notes scoped to the queried `outlet_id` and `time_window` (bounded to $\le 6$ rows, with explicit overflow indicator if $>6$, and respecting audited irrelevant co-citation exclusions like the `R8` onion control).
  2. Do **not** require an explicit target link on an unresolved note inside the queried outlet/window for it to appear in the `sourceContext` disclosure block.
  3. Verify on saved `R13 C2` state that the vendor's `"remaining 1 kg tomorrow"` promise and the planned bank-statement check both render deterministically.
  4. For `B1`, ensure raw `S8` (`"don't know, ask Birch"`) is either captured in extraction or surfaced via the same unlinked-context floor when present in the queried message batch.

### Fix 3 — Native Reporter Provenance Regression Check on `C1` (`Fixes C1 PARTIAL`)
- **Implementation**:
  1. Audit why `R13 C1`'s `Cedar 11 kg` receipt omitted the stored reporter binding when `A1` (`24.5 kg -> Nila`) and `B2` (`17.6 kg -> Nila`) succeeded under `v6`.
  2. Add `C1 Cedar 11 kg` reporter binding and `B1 S8` receiver uncertainty to the offline extraction/admission regression suite (`GF1-TST-B-R3`).

---

## 3. Acceptance Gate to Close `GF1-TST-B` and Advance to Purchase-Check

1. **Offline Gate (`0` tokens)**: Saved `R13` replay (including the captured `B2` raw response) must render `A1`, `A2`, `B1`, `B2`, `C1`, and `C2` with zero schema rejections and zero material omissions.
2. **One Finite `R14` Run (Only If Required for `B1`/`C1` Extraction Proof)**: If `B1` (`S8`) or `C1` (`Cedar` reporter) requires a fresh intake call, run **only** the affected episode(s) or one final 15-call pass—and immediately advance to the **frozen unseen Purchase-Check evaluation cases** rather than continuing to loop on the 6 familiar questions.
