export type Session = {
    id: string,
    data: { [key: string]: any }
}

export interface SessionRepository {

    createSession() : Promise<Session>;

    getSession(id: string): Promise<Session | undefined>;

    saveSession(session: Session, expires: Date): Promise<void>;

    touchSession(session: Session, expires: Date) : Promise<void>
}
