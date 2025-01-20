export interface BookingStore {
    imageList: string[]
    set: {
        (
            partial:
                | BookingStore
                | Partial<BookingStore>
                | ((
                      state: BookingStore
                  ) => BookingStore | Partial<BookingStore>),
            replace?: false | undefined
        ): void
        (
            state: BookingStore | ((state: BookingStore) => BookingStore),
            replace: true
        ): void
    }
    uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void
    removeImage: (imageURL: string) => void
}
