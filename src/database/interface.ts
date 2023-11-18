export interface INote {
    title: string;
    content: string;
  }
  
  export interface INoteModel {
    createNewNote: (title: string, content: string) => Promise<INote>;
    getAllNotes: () => Promise<INote[]>;
    // Add other methods as needed
  }
  