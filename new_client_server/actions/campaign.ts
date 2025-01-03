"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

// import { promises as fs } from "fs";
import { templates } from "@/app/data/template";
import { user_group } from "@/app/data/user_group";

async function isCampaignExist(campaignId: string) {
  const campaign = await prisma.campaign.findFirst({
    where: {
      id: campaignId,
    },
  });

  return campaign;
}

export async function createCampaign(formdata: FormData) {
  try {
    const campaignData = {
      name: formdata.get("campaign-name") as string,
      templateId: formdata.get("mail-template") as string,
      userGroupId: formdata.get("user-group") as string,
      scheduleDate: formdata.get("day-schedule") as string,
      scheduleTime: formdata.get("time-schedule") as string,
    };

    const campaign = await prisma.campaign.create({
      data: campaignData,
    });

    if (campaign) {
      //   const result = await resp.json();
      //   console.log(result);
      revalidatePath("/", "page");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}

export async function updateCampaign(formdata: FormData, campaignId: string) {
  try {
    const campaignData = {
      name: formdata.get("campaign-name") as string,
      templateId: formdata.get("mail-template") as string,
      userGroupId: formdata.get("user-group") as string,
      scheduleDate: formdata.get("day-schedule") as string,
      scheduleTime: formdata.get("time-schedule") as string,
    };

    const isExist = isCampaignExist(campaignId);
    if (!isExist) {
      throw Error(`Campaign not found for ${campaignId}`);
    }

    const campaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: campaignData,
    });

    if (campaign) {
      //   const result = await resp.json();
      //   console.log(result);
      revalidatePath("/", "page");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}

export async function deleteCampaign(campaignId: string) {
  try {
    const isExist = isCampaignExist(campaignId);
    if (!isExist) {
      throw Error(`Campaign not found for ${campaignId}`);
    }

    await prisma.campaign.delete({
      where: {
        id: campaignId,
      },
    });
    revalidatePath("/", "page");
    return true;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}

export async function getAllCampaign() {
  try {
    const campaigns = await prisma.campaign.findMany();
    return campaigns;
  } catch (error) {
    console.error("Error getting all campaigns", error);
    return [];
  }
}

export async function getTemplates() {
  try {
    // const file = await fs.readFile("/data/template.json");
    // const data = JSON.parse(file);
    // return data;
    const data = templates;
    return data;
  } catch (error) {
    console.error("Error while getting template", error);
    return null;
  }
}

export async function getUserGroups() {
  try {
    // const file = await fs.readFile(
    //   process.cwd() + "/public/data/user_group.json",
    //   "utf-8"
    // );
    // const data = JSON.parse(file);
    const data = user_group;
    return data;
  } catch (error) {
    console.error("Error while getting user groups", error);
    return null;
  }
}
