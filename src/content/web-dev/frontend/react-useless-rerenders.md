---
title: "Stop Useless Re-renders in React"
desc: "A very simple guide to find why your React app is slow and how to fix it easily."
category: "Frontend"
readTime: "4 min read"
date: "July 10, 2026"
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200"
---

React is great. It updates the screen when data changes. But sometimes, React does too much work. It re-renders components even when nothing really changed. This makes your app slow, especially on old phones.

Let us learn why this happens and how to make it fast.

### Why React Re-renders

React re-renders a component in three main situations:
1. The **state** of the component changes.
2. The **props** sent by the parent change.
3. The **parent component** itself re-renders. (Even if props did not change!)

The third point is the most common reason for slow apps. Let's look at an example.

```tsx
// This is a slow parent component
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click count: {count}
      </button>
      <BigExpensiveList />
    </div>
  );
}
```

Every time you click the button, `Parent` changes its state. This means `Parent` re-renders. Because of this, `<BigExpensiveList />` also re-renders from scratch, even though it does not use `count`!

### How to Fix This

There are two easy ways to fix this useless work.

#### 1. Move State Down

If state is only used in one small part, put the state inside that small part. Don't keep it in the parent.

```tsx
// Good way: Move state to a small button component
function Clicker() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Click count: {count}
    </button>
  );
}

function Parent() {
  return (
    <div>
      <Clicker />
      <BigExpensiveList />
    </div>
  );
}
```

Now, when you click the button, only `Clicker` re-renders. `Parent` and `BigExpensiveList` stay quiet and fast.

#### 2. Use React.memo

If you cannot move state down, you can tell React: "Only re-render this component if its props actually change." We do this with `React.memo`.

```tsx
import { memo } from "react";

// Now React will skip re-rendering if props are the same
const BigExpensiveList = memo(function BigExpensiveList() {
  return (
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
});
```

Using these two tricks, your React apps will run much faster immediately.
