export class ApiActionList {
   public static get Post_Resource_New(): string { return "PostResourceNew"; };
   public static get Get_Resource_List(): string { return "GetAllResources"; };

   public static get Post_Project_New(): string { return "PostProjectNew"; };
   public static get Get_Project_List(): string { return "GetAllProjects"; };

   public static get Post_Activity_New(): string { return "PostActivityNew"; };
   public static get Get_Activity_List(): string { return "GetAllActivities"; };

   public static get Post_Project_Resource_Assigned(): string { return "PostProjectResourceAssigned"; };
   public static get Update_Project_Resource_Assigned(): string { return "UpdateProjectResourceAssigned"; };
   public static get Get_Project_Resource_Assigned(): string { return "GetAllProjectResourceAssigned"; };

   public static get Post_SubActivity_New(): string { return "PostSubActivityNew"; };
   public static get Get_SubActivity_List(): string { return "GetAllSubActivities"; };
}
