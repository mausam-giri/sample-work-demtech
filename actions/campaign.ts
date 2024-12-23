"use server";

export async function createCampaign(formdata: FormData) {
  const rawFormData = {
    name: formdata.get("campaign-name"),
    templateId: formdata.get("mail-template"),
    groupId: formdata.get("user-group"),
    scheduleDate: formdata.get("schedule-date"),
    scheduleTime: formdata.get("schedule-time"),
  };

  console.log(rawFormData);
}
