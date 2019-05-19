import Link from 'next/link';
import Address from '../components/Address';

export default() => (
  <div>
    <Address />
    <hr />
    <div>
      <Link href="/address_add">
        <button>add</button>
      </Link>
    </div>
  </div>
);