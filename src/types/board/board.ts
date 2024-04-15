export interface ISpoBoardComment {
    boardCommentSequence: number; // 게시판 댓글 일련번호
    boardSequence: number; // 게시판 일련번호
    userSequence: number; // 유저 일련 번호
    comment: string; // 댓글
    nickName: string; // 닉네임
    deleteYn: string; // 삭제여부
    createAt: string; // 생성 일자
    updateAt: string; // 업데이트 일자
}

export interface ISpoBoard {
    boardSequence: number; // 게시판 일련번호
    userSequence: number; // 유저 일련 번호
    title: string; // 제목
    detail: string; // 내용
    nickName: string; // 닉네임
    deleteYn: string; // 삭제여부
    createAt: string; // 생성 일자
    updateAt: string; // 업데이트 일자
    boardComment: ISpoBoardComment[];
}

// 게시판 상세
export interface IBoardDetailComment {
    boardCommentSequence: number; // 게시판 댓글 일련번호
    boardSequence: number; // 게시판 일련번호
    userSequence: number; // 유저 일련 번호
    comment: string; // 댓글
    nickName: string; // 닉네임
    deleteYn: string; // 삭제여부
    createAt: string; // 생성 일자
    updateAt: string; // 업데이트 일자
}

export interface IBoardDetail {
    boardSequence: number; // 게시판 일련번호
    userSequence: number; // 유저 일련 번호
    title: string; // 제목
    detail: string; // 내용
    nickName: string; // 닉네임
    deleteYn: string; // 삭제여부
    createAt: string; // 생성 일자
    updateAt: string; // 업데이트 일자
    boardComment: Array<IBoardDetailComment>;
}

// 게시판 글 수정
export interface IUpdateBoardReq {
    detail:string // 내용
    title:string // 제목
    userSequence:number // 유저 일련번호
}

export interface IUpdateBoardCommentReq{
    comment:string // 댓글
    userSequence:string // 유저 일련번호
}

// 게시판 글 생성
export interface ICreate{
    title:string // 제목
    detail:string // 내용
}

// 게시판 댓글 등록
export interface ICreateComment{
    comment:string // 댓글
}
