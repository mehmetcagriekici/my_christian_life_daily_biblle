"use client";

//imports
import { JSX } from "react";
import BtnPage from "../BtnPage";
import { FieldValues, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import SubmitBtn from "../SubmitBtn";
import { useProfileEdit } from "@/hooks/useProfileEdit";
import { SelectChangeEvent } from "@mui/material";
import EditFormSection from "./EditFormSection";
import { useAppSelector } from "@/store/hooks";
import { updateUser } from "@/services/getUser";

export default function EditProfile({
  icons,
  initialStateData,
}: {
  icons: { [key: string]: JSX.Element };
  initialStateData: { [key: string]: string | number };
}) {
  //edit form state and controllers
  const {
    state,
    updateSubRegions,
    updateCountries,
    updateStates,
    updateCities,
    controlCity,
    //controlAvatar,
    controlChurch,
    controlClergyMember,
    controlUsername,
    openEditForm,
    closeEditForm,
  } = useProfileEdit({ initialStateData });

  //global data
  const {
    subRegions,
    countries,
    states,
    cities,
    username,
    region,
    sub_region,
    country,
    state: country_state,
    city,
    church,
    clergy_member,
  } = useAppSelector((s) => s.location);

  //react hook form
  const { register, handleSubmit, reset } = useForm();

  //functions
  function onChurchChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    controlChurch(value);
  }

  function onClergyMemberChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    controlClergyMember(value);
  }

  function onUserNameChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    controlUsername(value);
  }

  /*
  function onAvatarChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    controlAvatar(value);
  }
*/

  function onRegionChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateSubRegions(value);
  }

  function onSubRegionChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateCountries(value);
  }

  function onCountryChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateStates(value);
  }

  //on state change
  function onStateChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateCities(value);
  }

  function onCityChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    controlCity(value);
  }

  function quitEditing() {
    //ui only
    //no save
    closeEditForm();
    //reset fields
    reset();
  }

  function openEdit() {
    //ui only
    openEditForm();
  }

  //function submit
  async function onSubmit(data: FieldValues) {
    //update user auth
    //update user table
    await updateUser({ data });

    //reset
    reset();
  }

  if (state.openEdit)
    return (
      <div className="absolute top-3/4 left-1/2 z-30 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3 flex flex-col justify-center items-center gap-3 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col justify-safe-center items-safe-center gap-3 border-2 border-gold rounded-lg p-3 overflow-y-auto bg-gray-100 select-none dark:border-white dark:bg-gray-900 md:text-xl"
        >
          <EditFormSection displayDivider={false}>
            <BtnPage onClick={quitEditing}>Quit editing</BtnPage>
          </EditFormSection>

          <EditFormSection displayDivider={false}>
            <FormInput
              register={register}
              fieldName="username"
              icon={{ label: "username", emoji: icons["username"] }}
              isSelect={false}
              type="text"
              value={username}
              onChange={onUserNameChange}
            />
          </EditFormSection>

          <EditFormSection>
            <FormInput
              register={register}
              fieldName="region"
              icon={{ label: "region", emoji: icons["region"] }}
              isSelect={true}
              type=""
              value={region}
              options={state.regions}
              onChange={onRegionChange}
            />
          </EditFormSection>

          {subRegions.length ? (
            <EditFormSection>
              <FormInput
                register={register}
                fieldName="sub_region"
                icon={{ label: "sub region", emoji: icons["sub_region"] }}
                isSelect={true}
                type=""
                value={sub_region}
                options={subRegions}
                onChange={onSubRegionChange}
              />
            </EditFormSection>
          ) : (
            ""
          )}

          {countries.countries.length ? (
            <EditFormSection>
              <FormInput
                register={register}
                fieldName="country"
                icon={{ label: "country", emoji: icons["country"] }}
                isSelect={true}
                type=""
                value={country}
                options={countries.countries}
                onChange={onCountryChange}
              />
            </EditFormSection>
          ) : (
            ""
          )}

          {states.states.length ? (
            <EditFormSection>
              <FormInput
                register={register}
                fieldName="state"
                icon={{ label: "state", emoji: icons["state"] }}
                isSelect={true}
                type=""
                value={country_state}
                options={states.states}
                onChange={onStateChange}
              />
            </EditFormSection>
          ) : (
            ""
          )}

          {cities.length ? (
            <EditFormSection>
              <FormInput
                register={register}
                fieldName="city"
                icon={{ label: "city", emoji: icons["city"] }}
                isSelect={true}
                type=""
                value={city}
                options={cities}
                onChange={onCityChange}
              />
            </EditFormSection>
          ) : (
            ""
          )}

          <EditFormSection>
            <FormInput
              register={register}
              fieldName="clergy_member"
              icon={{ label: "clergy member", emoji: icons["clergy_member"] }}
              isSelect={true}
              type=""
              value={clergy_member}
              options={state.clergy_options}
              onChange={onClergyMemberChange}
            />
          </EditFormSection>

          <EditFormSection>
            <FormInput
              register={register}
              fieldName="church"
              icon={{ label: "church", emoji: icons["church"] }}
              isSelect={false}
              type="text"
              value={church}
              onChange={onChurchChange}
            />
          </EditFormSection>

          <EditFormSection displayDivider={false}>
            <SubmitBtn>submit</SubmitBtn>
          </EditFormSection>
        </form>
      </div>
    );

  //return open modal button
  //direct child of the profile page
  return (
    <div className="absolute top-20 left-10 md:top-24 md:left-52 md:text-2xl lg:top-28 xl:top-20 xl:left-1/2 xl:-translate-x-1/2 xl:text-xl">
      <BtnPage onClick={openEdit}>Edit Profile</BtnPage>;
    </div>
  );
}
