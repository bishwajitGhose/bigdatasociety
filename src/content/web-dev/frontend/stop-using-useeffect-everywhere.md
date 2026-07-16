---
title: "React: Stop Using useEffect for Everything"
desc: "Many React developers abuse useEffect. Let us learn when you actually need it and how to write clean code without it."
category: "Frontend"
readTime: "5 min read"
date: "July 16, 2026"
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200"
---

When hooks were introduced to React, `useEffect` became the go-to tool for everything. Need to calculate a value when state changes? Use `useEffect`. Need to change a prop value? Use `useEffect`.

But this causes a big problem: **spaghetti code**. Your components become hard to read, trigger infinite loops, and run too slowly.

Let's look at two common situations where you **do not** need `useEffect` and how to write them cleanly.

---

### Case 1: Calculating Values from State

Imagine you have a shopping list. You want to show the total price of all items.

#### The Bad Way (With `useEffect`):
```tsx
function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Bad: Triggering an extra re-render!
  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  }, [items]);

  return <div>Total: {total}</div>;
}
```
**Why is this bad?** When `items` changes, React renders the component. Then, `useEffect` runs and calls `setTotal`. This changes the state again, forcing React to render the component a *second* time.

#### The Good Way (Simple Calculation):
```tsx
function Cart() {
  const [items, setItems] = useState([]);

  // Good: Calculates during the normal render path
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return <div>Total: {total}</div>;
}
```
If the calculation is very slow (like filtering thousands of rows), you can wrap it in `useMemo` instead:
```tsx
const total = useMemo(() => {
  return items.reduce((acc, item) => acc + item.price, 0);
}, [items]);
```

---

### Case 2: Resetting State when Props Change

Imagine you have a `<Profile />` component. It takes a `userId` prop and has a local text input state. When the `userId` changes, you want to clear the text input.

#### The Bad Way (With `useEffect`):
```tsx
function Profile({ userId }) {
  const [comment, setComment] = useState("");

  // Bad: Component renders first with the old comment, then clears it
  useEffect(() => {
    setComment("");
  }, [userId]);

  return <input value={comment} onChange={e => setComment(e.target.value)} />;
}
```

#### The Good Way (Using React Keys):
Instead of watching the prop change with `useEffect`, you can give the component a `key` prop when you call it. When the `key` changes, React automatically deletes the old component state and builds a fresh one.

```tsx
// Inside Parent component:
// When userId changes, React destroys the old Profile and resets all its state
<Profile key={userId} userId={userId} />
```

---

### When do you actually need `useEffect`?

You only need `useEffect` when you need to **synchronize your app with an external system**. 
* Examples: Fetching data from an API, subscribing to a chat socket, or setting up a browser timer.

If you are just changing state based on other state, do it directly in the render or event handlers. Your code will be much faster and easier to debug!
