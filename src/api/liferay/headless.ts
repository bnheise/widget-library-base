export type BaseHeadlessResponse = {
  actions: {
    [key: string]: Action;
  };
  creator: Creator;
  customFields: [];
  dateCreated: Date;
  dateModified: Date;
  datePublished: Date;
};

export type Action = {
  method: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
  href: string;
};

export type Creator = {
  additionalName: string;
  contentType: "UserAccount";
  familyName: string;
  givenName: string;
  id: number;
  image: string;
  name: string;
};
