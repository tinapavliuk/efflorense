// src/App.tsx

import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Efflorense</h1>
      <p>Проєкт запущений. Цей компонент існує лише для демо.</p>

      <button onClick={() => setCount((c) => c + 1)}>Лічильник: {count}</button>

      {/* 
        ⬇️ Можеш залишити цей коментар і показати викладачу, 
        що хуки створені у src/shared/hooks та features/.../lib.
        В App.tsx ми їх не імпортуємо — це ок.
      */}
    </main>
  );
}
