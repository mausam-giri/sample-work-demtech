import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
// import { promises as fs } from "fs";
import { templates as templatesData } from "@/app/data/template";
import { user_group } from "@/app/data/user_group";

type TemplateData = {
  id: string;
  name: string;
};
type Users = {
  name: string;
  email: string;
};
type UserGroupData = {
  id: string;
  name: string;
  users: Users[];
};

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const campaignId = request.nextUrl.searchParams.get("campaignId");

  if (!campaignId)
    return NextResponse.json({ message: "Invalid request" }, { status: 404 });

  const campaignDetails = await prisma.campaign.findFirst({
    where: {
      id: campaignId,
    },
  });
  if (!campaignDetails)
    return NextResponse.json({ message: "Invalid request" }, { status: 404 });

  //   Get Template Data
  // const templateFile = await fs.readFile(
  //   process.cwd() + "/data/template.json",
  //   "utf-8"
  // );
  // const templates: TemplateData[] = JSON.parse(templateFile);
  const templates: TemplateData[] = templatesData;
  const templateData = templates.filter(
    (template) => template.id === campaignDetails.templateId
  );

  // Get User Data
  // const userGroupFile = await fs.readFile(
  //   process.cwd() + "/data/user_group.json",
  //   "utf-8"
  // );
  // const userGroups: UserGroupData[] = JSON.parse(userGroupFile);
  const userGroups: UserGroupData[] = user_group;
  const userGroupData = userGroups.filter(
    (group) => group.id === campaignDetails.userGroupId
  );

  return NextResponse.json(
    {
      data: {
        template: templateData,
        userGroup: userGroupData,
        scheduleData: campaignDetails.scheduleDate,
        scheduleTime: campaignDetails.scheduleTime,
      },
    },
    {
      status: 200,
    }
  );
}
