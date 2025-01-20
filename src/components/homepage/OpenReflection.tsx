"use client";
//imports
import BtnPage from "../BtnPage";
import CreateIcon from "@mui/icons-material/Create";

export default function OpenReflection({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  return isLoggedIn ? (
    <div>
      <BtnPage onClick={() => {}}>
        <CreateIcon />
        <span>Express Your Thoughts</span>
      </BtnPage>
    </div>
  ) : (
    ""
  );
}
