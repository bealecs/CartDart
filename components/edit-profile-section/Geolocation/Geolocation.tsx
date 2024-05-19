"use client"
import Map from './Map';
import UpdateLocation from './UpdateLocation';

export function GeoLocationComponent(){


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          UpdateLocation(latitude, longitude);
          alert('Your new location has been posted');
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle unsupported browser
    }
  };

  return (
    <div className='mx-5 my-5'>
     <button className='text-xl' onClick={getLocation}>Update Location</button>
     <Map />
    </div>
  );
};