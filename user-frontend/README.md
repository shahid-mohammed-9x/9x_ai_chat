# 9x Ai Chat

**9x Ai Chat** is an intelligent, real-time AI chat application powered by React and Redux. It integrates state-of-the-art conversational features with scalable front-end architecture and follows best practices for component structure, state management, and maintainability.

---

## 🚀 Features

- 💬 Real-time AI-powered chat interface
- 🌐 React + Redux integration
- ⚙️ Scalable and maintainable code structure
- 📦 Modular constants, state, hooks, and utilities
- 🧠 Custom hooks for clean business logic
- 🧪 Easily testable and debuggable code

---

## 🧭 Coding Standards (Must Follow)

To ensure consistency across the codebase, all contributors must follow the standards below when writing components:

### ✅ Component Structure

```tsx
// Always follow this order inside every component

1. Imports (React, libraries, custom modules, styles)
2. Constants
3. Redux (useSelector / useDispatch)
4. useState (local state)
5. Custom Hooks
6. useEffect (side effects)
7. Functions / Handlers
8. JSX Return
```

## 🧱 Project Structure

```bash
9x-ai-chat/
├── public/
├── src/
│   ├── assets/              # Images, icons, fonts
│         └── css/           # CSS
│         └── svgs/          # SVGS
│         └── images/        # images
│   ├── components/          # Reusable UI components
│         └── ui/            # Shadcn UI
│   ├── constants/           # Static values and enums
│   ├── hooks/               # Custom React hooks
│   ├── helpers/             # Helpers
│   ├── services/            # Services
│   ├── views/               # Page-level components
│         └── pages/         # Pages
│         └── Layouts/       # Layouts
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   ├── redux/               # Redux,slices,actions, store
```
