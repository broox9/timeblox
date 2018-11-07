import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h1>Home</h1>
      <Link to="/about">About</Link>
    </section>
  )
}