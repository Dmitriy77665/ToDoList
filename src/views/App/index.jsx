import React, { useState } from 'react';

import  {InputPlus}  from '../components/InputPlus/InputPlus';
import  {InputTask}  from '../components/InputTask/InputTask';

import styles from './index.module.scss';

export const generateId = () => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const App = () => {
  
  const [tasks, setTasks] = useState([])

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do List</h1>
      <section className={styles.articleSection}>
          <InputPlus 
          onAdd={(title) => {
            if(!title) {
                return
              } else {
                setTasks([
                  {
                  id: generateId(),
                  title,
                  },
                  ...tasks
              ])
              }
            } 
          }
          />
      </section>
      <section className={styles.articleSection}>
        {tasks.length <= 0 && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask
            id={task.id}
            key={task.id}
            title={task.title}
            onDone={(id) => {
              setTasks(tasks.filter((task) => task.id !== id))
            }}
            onRemove={(id) => {
              setTasks(tasks.filter((task) => task.id !== id))
            }}
            onEdited={(id, value) => {
              setTasks(tasks.map((task) => task.id === id ? {
                ...task,
                title: value
              } : task))
            }}
          />
        ))}
      </section>
    </article>
  );
}