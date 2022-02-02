import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LocationTable from "./LocationTable";
import { ResidentDetails } from "./ResidentDetails";

function App() {
  const [locations, setLocations] = useState([]);
  const [charactersDataMap, setCharactersDataMap] = useState(null);

  useEffect(() => {
    const loadLocationsAndCharactersData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const json = await response.json();
      const locations = json.results ?? [];

      const locationCharacterIdMap = new Map();

      const characterIds = locations.reduce((ids, location) => {
        (location?.residents || []).forEach((resident) => {
          const id = +resident.slice(resident.lastIndexOf("/") + 1);
          ids.add(id);
          locationCharacterIdMap.set(id, location.id);
        });
        return ids;
      }, new Set());

      // load characters data
      const charactersData = await fetch(
        `https://rickandmortyapi.com/api/character/[${Array.from(
          characterIds
        ).join(",")}]`
      );
      const charactersResponse = await charactersData.json();

      const charactersMap = new Map();
      charactersResponse.forEach((character) => {
        const locationId = locationCharacterIdMap.get(character.id);
        charactersMap.has(locationId)
          ? charactersMap.get(locationId).push(character)
          : charactersMap.set(locationId, [character]);
      });

      setLocations(locations);
      setCharactersDataMap(charactersMap);
    };

    loadLocationsAndCharactersData();
  }, []);

  const getResidentDetailsById = (locationId, characterId) =>
    charactersDataMap.get(locationId).find(({ id }) => id === characterId);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LocationTable rows={locations} charactersMap={charactersDataMap} />
          }
        />
        <Route
          path="locations/:locationId/characters/:characterId"
          element={
            <ResidentDetails getResidentDetailsById={getResidentDetailsById} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
