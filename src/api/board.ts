import ApiUtil from '~/util/ApiUtil'
import { ICreate, ICreateComment, IUpdateBoardCommentReq, IUpdateBoardReq } from '~/types/board/board'

// 게시판 전체 조회
export const SpoBoard = () => ApiUtil.get('/board', { })
// 게시판 상세 조회
export const boardDetail = (boardSequence:number) => ApiUtil.get(`/board/${boardSequence}`, {})

// 게시판 글 생성
export const CreateBoard = (params: ICreate) => ApiUtil.post('/board', params)

// 게시판 글 수정
export const UpdateBoard = (params: IUpdateBoardReq, boardSequence:number) => ApiUtil.put(`/board/${boardSequence}`, params)

// 게시판 글 삭제
export const DeleteBoard = (boardSequence:number) => ApiUtil.delete(`/board/${boardSequence}`, { })

// 댓글 등록
export const CreateComment = (params : ICreateComment, boardSequence:number) => ApiUtil.post(`/board/comment/${boardSequence}`, params)

// 댓글 수정
export const UpdateComment = (params: IUpdateBoardCommentReq, boardCommentSequence:number) => ApiUtil.put(`/board/comment${boardCommentSequence}`, params)

// 댓글 삭제
export const DeleteBoardComment = (boardCommentSequence:number) => ApiUtil.delete(`/board/comment/${boardCommentSequence}`, {})
