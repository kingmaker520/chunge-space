export type Gender = "male" | "female";

export interface PublicUser {
  id: string;
  nickname: string;
  gender: Gender;
  avatarEmoji: string;
}

export interface CommentDTO {
  id: string;
  targetType: "article" | "project";
  targetId: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  author: PublicUser;
  isAuthor: boolean; // 是否为站点主人（春哥）
  replies?: CommentDTO[];
}

export const SITE_OWNER_ID = "owner-chunge"; // 站点主人固定标识（春哥）
