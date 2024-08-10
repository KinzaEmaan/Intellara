import axios from "axios"
import Link from "next/link"
import {AiFillCheckCircle} from 'react-icons/ai'

const Pricingg = ({price}) => {

const dynamicSubTitle = (price) => {
  if (price && price.nickname === "Monthly plan") {
    return <p className="text-blue-600">Get started with premium access to our platform on a month-to-month basis. </p>;
  } else if (price && price.nickname === "Weekly plan") {
    return <p className="text-blue-600">Weekly Special</p>;
  } else if (price && price.nickname === "1 year plan") {
    return <p className="text-blue-600">With this plan, you unlock a full year of access to our premium features and services.</p>;
}
}

const dynamicDescription = (price) => {
  if (price && price.nickname === "Monthly plan") {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <h2 className="text-sm text-gray-500">Utilize automation tools with a monthly subscription.</h2>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <h2 className="text-sm text-gray-500">
          Receive responsive support for any inquiries.
          </h2>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <h2 className="text-sm text-gray-500">
          Benefit from continuous software improvements.
          </h2>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <h2 className="text-sm text-gray-500">Easy monthly billing for seamless management.</h2>
        </div>
        <div className="border" />
      </div>
    );
  } else if (price && price.nickname === "Weekly plan") {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">Experience automation benefits on a flexible weekly basis.</p>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">Get immediate support for any issues or questions.</p>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">
          Stay up-to-date with the latest enhancements.
          </p>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">Convenient payment option with weekly billing.</p>
        </div>
        <div className="border" />
      </div>
    );
  } else if (price && price.nickname === "1 year plan") {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">Access advanced automation features for an entire year</p>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">Enjoy priority customer support for quick assistance.</p>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">
          Receive regular updates and new feature releases.
          </p>
        </div>
        <div className="border" />
        <div className="flex space-x-3">
          <AiFillCheckCircle
            className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
            aria-hidden="true"
          />
          <p className="text-sm text-gray-500">Save significantly with a discounted annual subscription.</p>
        </div>
        <div className="border" />
      </div>
    );
  }
};

// POST request 
const handleSubscription = async (e) => {
  e.preventDefault();
  const { data } = await axios.post('/api/users/checkout',
  {
    priceId: price.id
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  window.location.assign(data)
}
if (!price) {
  return <div>Loading...</div>; // handle undefined price
}

  return (
    <div className="border-gray-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
       <div>
        <div className="bg-gray-100 h-28 items-center font-bold">
           <h4 className="text-3xl">{price.nickname}</h4>
           <p>{dynamicSubTitle(price)}</p>
           <h3>Unlock premium features, exclusive content, and dedicated support to elevate your experience.</h3>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center pt-4">
              <h1 className="text-5xl font-bold"> 
              {(price.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
              </h1>
          </div>
          <ul className="flex justify-center">
              <li className="text-xl font-bold" >{dynamicDescription(price)}</li>
          </ul>
          <div className="mt-8 flex justify-center">
  <button className=" w-[600px] rounded-md border border-transparent bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2.5 text-sm shadow-sm" onClick={handleSubscription}>
    Purchase now
  </button>
</div>

        </div>
       </div>
    </div>
  )
}

export default Pricingg