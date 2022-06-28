import jwt_decode from 'jwt-decode';

export const validaPermissao = (
    token: string | undefined,
    tipo: Array<string>
): boolean => {

    if (token) {

        const user = jwt_decode<{
            email: string,
            id: number,
            nome: string,
            tipo: string
        }>(token);


        const temPermissao = tipo.includes(
            user.tipo
        );

        if (temPermissao) {
            return true;
        }

        return false;

    }

    return false;
}