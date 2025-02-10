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
import { setOpenEdit } from "@/store/slices/editSlice";

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

  const { gender, age, avatar } = initialStateData;

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
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/app_images/default-user.jpg`}
            alt="default avatar"
            height={80}
            width={80}
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
      {/*age*/}
      <li className="w-full flex flex-col justify-center items-center">
        {icons["age"]}
        <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
          age
        </span>
        <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
          {age}
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
