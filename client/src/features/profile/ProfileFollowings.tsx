import React from "react";

type Props = {
  activeTab: number;
};

export default function ProfileFollowings({ activeTab }: Props) {
  return <div>`ProfileFollowings${activeTab}`</div>;
}
