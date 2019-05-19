import Link from 'next/link';

export default () => <div>
  <h1>Next.js</h1>
  <p>This is Other page</p>
  <hr />
  <div>
    <Link href="/">
      <a>&lt;&lt;Back to Index page.</a>
    </Link>
  </div>
</div>