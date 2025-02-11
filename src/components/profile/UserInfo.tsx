"use client";
//imports
import getSignedUrl from "@/services/getImage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AVATAR } from "@/utils/constants";
import { Divider } from "@mui/material";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import DividerText from "../DividerText";
import BtnPage from "../BtnPage";
import {
  setChurch,
  setCities,
  setCity,
  setClergy,
  setCountries,
  setCountry,
  setOpenEdit,
  setRegion,
  setState,
  setStates,
  setSubRegion,
  setSubRegions,
  setUsername,
} from "@/store/slices/editSlice";
import { getCountries, getSubRegions } from "@/services/getCountries";
import { getCities, getStates } from "@/services/getCities";
import defaultAvatar from "../../../public/default-user.jpg";

export default function UserInfo({
  icons,
  initialStateData,
}: {
  icons: { [x: string]: JSX.Element };
  initialStateData: {
    [key: string]: string | number;
  };
}) {
  //update the global state
  const {
    username,
    region,
    sub_region,
    country,
    state: country_state,
    city,
    church,
    clergy_member,
  } = useAppSelector((s) => s.location);
  const dispatch = useAppDispatch();

  const { gender, avatar } = initialStateData;

  //init global user variables
  //for user information
  //and for the form
  useEffect(() => {
    const fetchOptions = async () => {
      //init data on global state
      dispatch(setUsername(initialStateData.username as string));
      dispatch(setRegion(initialStateData.region as string));
      dispatch(setSubRegion(initialStateData.sub_region as string));
      dispatch(setCountry(initialStateData.country as string));
      dispatch(setState(initialStateData.state as string));
      dispatch(setCity(initialStateData.city as string));
      dispatch(setChurch(initialStateData.church as string));
      dispatch(setClergy(initialStateData.clergy_member as string));

      const { subRegions } = await getSubRegions(
        initialStateData.region as string
      );

      dispatch(setSubRegions(subRegions));

      const { countries } = await getCountries(
        initialStateData.sub_region as string
      );

      dispatch(
        setCountries({
          countries: countries.map((country) => country.name),
          countryCodes: Object.fromEntries(
            countries.map((country) => [country.name, country.code])
          ),
        })
      );

      const currentCountryCode = countries.find(
        (c) => c.name === initialStateData.country
      )?.code;

      if (currentCountryCode) {
        const { states } = await getStates(currentCountryCode);

        dispatch(
          setStates({
            states: states.map((state) => state.name),
            stateCodes: Object.fromEntries(
              states.map((state) => [state.name, state.code])
            ),
          })
        );

        const currentStateCode = states.find(
          (s) => s.name === initialStateData.state
        )?.code;

        if (currentStateCode) {
          const { cities } = await getCities(
            currentCountryCode,
            currentStateCode
          );

          dispatch(setCities(cities));
        }
      }
    };

    fetchOptions();
  }, [dispatch, initialStateData]);

  //get avatar
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const getAvatar = async (filePath: string) => {
      //check if user has avatar
      if (avatar) {
        const { signedUrl } = await getSignedUrl(filePath);

        if (signedUrl) setUrl(signedUrl);
      }
    };

    getAvatar(AVATAR);
  }, [avatar]);

  //function to open edit
  function openEdit() {
    dispatch(setOpenEdit(true));
  }

  return (
    <ul className="w-full flex flex-col justify-safe-center items-safe-center gap-3 rounded-lg p-3 overflow-y-auto lg:bg-gray-100 select-none lg:dark:bg-gray-900 md:text-xl">
      <li>
        <DividerText
          quote="Dominus petra mea, et fortitudo mea, et salvator meus."
          psalm="Psalm 17:2"
        />
      </li>
      <li>
        <BtnPage onClick={openEdit}>open edit form</BtnPage>
      </li>
      {/*avatar*/}
      <li className="flex gap-3 justify-center items-center">
        {icons["avatar"]}
        <span className="capitalize font-serifSecondary tracking-wide text-gray-800 dark:text-gray-200">
          avatar
        </span>
        {url ? (
          <Image
            src={url}
            alt="default avatar"
            height={80}
            width={80}
            className="rounded-full"
          />
        ) : (
          <Image
            src={defaultAvatar}
            alt="default avatar"
            className="rounded-full"
          />
        )}
      </li>

      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*usernamme*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["username"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          username
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {username}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*gender*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["gender"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          gender
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {gender}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*region*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["region"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          region
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {region}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*sub region*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["sub_region"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          sub region
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {sub_region}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*country*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["country"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          country
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {country}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*state*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["state"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          state
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {country_state}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*city*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["city"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          city
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {city}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*church*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["church"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          church
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {church}
        </span>
      </li>
      <Divider
        flexItem
        variant="middle"
        className="bg-gray-300 dark:bg-gray-600"
      />
      {/*clergy member*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["clergy_member"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          clergy member
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {clergy_member}
        </span>
      </li>
    </ul>
  );
}
