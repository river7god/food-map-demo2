import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import FoodList from "./FoodList";
import { listTruckFoodData } from "../libs/listTruckFoodData";

function MapG() {
  const position = { lat: 37.7752, lng: -122.4181 };
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const MAP_ID = process.env.REACT_APP_GOOGLE_MAPS_MAPID;

  console.info(apiKey + "--------" + MAP_ID);
  console.info(process.env);
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [foodList, setFoodList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();

  const initLocations = async () => {
    const locations_ = await listTruckFoodData();
    setFoodList(locations_);
    console.info(foodList);
  };

  useEffect(() => {
    initLocations();
  }, []);

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={position}
        mapId={MAP_ID}
        defaultZoom={15}
        style={containerStyle}
      >
        {foodList.map((location, index) => (
          <AdvancedMarker
            key={index}
            position={{
              lat: location.Latitude,
              lng: location.Longitude,
            }}
            title={location.Applicant}
            onClick={() => setSelectedLocation(location)}
          >
            {location.FacilityType === "Truck" ? (
              <img src="truck-icon.png" alt="Truck Icon" />
            ) : (
              <img src="food_maps_location.png" alt="Trolley Icon" />
            )}
          </AdvancedMarker>
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.Latitude,
              lng: selectedLocation.Longitude,
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
              <div className="bg-white w-1/2 p-6 rounded-lg">
                <h2 className="flex text-xl font-bold mb-4 space-x-10">
                  {selectedLocation.FacilityType === "Truck" ? (
                    <img
                      width={25}
                      height={25}
                      src="truck-icon.png"
                      alt="Truck Icon"
                    />
                  ) : (
                    <img
                      width={25}
                      height={25}
                      src="food_maps_location.png"
                      alt="Trolley Icon"
                    />
                  )}
                  <span> {selectedLocation.Applicant}</span>
                </h2>
                <p>
                  <img
                    src="place_gm_blue.png"
                    width={25}
                    height={25}
                    alt="food"
                  />{" "}
                  {selectedLocation.Address}
                </p>
                <p className="text-l">{selectedLocation.LocationDescription}</p>

                <h3 className="text-g font-semibold mb-2">Food Menu:</h3>
                <FoodList
                  foodList={selectedLocation.FoodItems?.split(/;|:|\./) ?? []}
                />
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}

export default MapG;
