export type TImage = {
  id: string;
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
  fileSize: number | null;
  fileType: string | null;
  alt: string | null;
  createdAt: Date;
};

export type CreateImageInput = {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  fileType?: string;
  fileSize?: number;
  width?: number;
  height?: number;
};
