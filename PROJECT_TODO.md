# Project TODO — Taskify (ToDo-advance)

This file lists remaining work to finish the todo app, prioritized.

## High Priority (status)

- Use object-shaped todos — DONE
  - `todoArr` now stores todo objects with `{ response, status, id }`.
  - Reason: lets you store status and a stable id; simplifies move/delete.

- Add unique id generation — DONE
  - Implemented `nextID` counter and each todo receives an `id` on creation.

- Centralize move/delete handlers — DONE
  - `moveTodo(id, newStatus)` and `deleteTodo(id)` are implemented and call `render()`.
  - The app now uses a single `todoArr` and renders columns by filtering `status`.

- Replace `prompt()` with an input form — TODO
  - Currently the app still uses `prompt()` in `addnewTodo()`; replacing with an inline input improves UX.

- Make createComponent render conditional action buttons — DONE
  - `createComponent(todo)` renders Start / Finish / Archive buttons depending on `todo.status`.
## Medium Priority (important enhancements)

- Persist to localStorage — TODO
  - Save `todoArr` to localStorage after changes and load on start to persist user data.

- Wire event handlers to ids not indices — DONE
  - Handlers are wired using closures and the stable `todo.id`; delete/move use id-based lookup.

- Add delete confirmation / undo — TODO
  - Consider adding a small confirm dialog or an undo snackbar after delete.

## Low Priority (nice-to-have)

- Drag & drop between columns — TODO
  - Implement native DnD or a library; update todo `status` on drop and call `render()`.

- Accessibility and keyboard support — TODO
  - Add ARIA attributes and keyboard navigation/shortcuts.

- Tests / manual-check script — TODO
  - Add lightweight tests or a manual-check script for core flows.

- Styling polish and animations — TODO
  - Add transitions when moving items between columns and polish styles.

## Notes and implementation hints

- Always update the central `todoArr` and call `render()`; avoid mutating DOM directly — the app follows this pattern already.
- Prefer passing `todo.id` into handlers (closures or `data-id`) — the code uses closures (`() => deleteTodo(todo.id)`).
- Consider replacing `prompt()` with a simple form input (next UX step).

---

If you want I can apply the high-priority changes now (switch todo shape + ids + central handlers + delete/start wiring). Tell me which items to implement first.