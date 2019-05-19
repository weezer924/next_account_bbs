import Link from 'next/link';
import AddressShow from '../components/AddressShow';

export default () => (
  <div>
    <AddressShow />
    <hr />
    <div>
      <Link href="/address">
        <button>back</button>
      </Link>
    </div>
  </div>
);