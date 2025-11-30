// 文档锚（标记了文字id）
import { Number2 } from '@math';

export interface DocumentAnchorWithTextId {
	pageId: string;
	textId?: string;
}

// 文档锚（标记了位置）
export interface DocumentAnchorWithPosition {
	pageId: string;
	position: Number2;
}

export type DocumentAnchor = DocumentAnchorWithPosition | DocumentAnchorWithTextId;
