import Link from 'next/link';
import AddressAdd from '../components/AddressAdd';

export default () => (
  <div>
    <AddressAdd />
    <hr />
    <div>
      <Link href="/address">
        <button>back</button>
      </Link>
    </div>
  </div>
);