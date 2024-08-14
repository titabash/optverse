import { atomWithRefresh, loadable } from "jotai/utils";
import AuthGateway from "app/entities/currentUser/api/authGateway";
import { AuthRepository } from "app/entities/currentUser/model/repository/authRepository";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAtom } from "jotai/react";

import { GeneralUserRepository } from "../model/repository/generalUserRepository";
import GeneralUserGateway from "app/entities/currentUser/api/generalUserGateway";
import { Tables } from "app/shared/type";
import { asyncAtom } from "app/shared/util/asyncAtom";

/**
 * currentUserAtom
 *
 *
 * @type {*}
 */
// 特定の処理に対するfetchFunctionを定義
const fetchCurrentUser = async () => {
  try {
    const authRepository: AuthRepository = new AuthGateway();
    const generalUserRepository: GeneralUserRepository =
      new GeneralUserGateway();
    const session = await authRepository.getSession();
    const authUser = await authRepository.getCurrentUser();
    if (session !== null && authUser !== null) {
      const currentUser = await generalUserRepository.findOne(authUser!.id);
      return currentUser;
    }
    return null;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch current user");
  }
};

// アトムを作成
export const currentUserAtom = asyncAtom(fetchCurrentUser);

/**
 * userAuthListener
 */
export const useAuthListener = () => {
  const [, refreshCurrentUser] = useAtom(currentUserAtom);
  useEffect(() => {
    const authRepository: AuthRepository = new AuthGateway();
    authRepository.onAuthStateChange((event, session) => {
      refreshCurrentUser();
    });
  }, []);
};
