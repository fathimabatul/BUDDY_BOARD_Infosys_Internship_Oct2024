  export interface Card {
    _id: string;
    title: string;
    content: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    __v: number;
  }
  
  export interface GetAllCardsResponse {
    statuscode: number;
    message: string;
    data: Card[];
    success: boolean;
  }
  
  export interface SingleCardResponse {
    statuscode: number;
    message: string;
    data: Card; // Reuse the existing Card interface
    success: boolean;
  }
    