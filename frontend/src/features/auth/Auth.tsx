import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

import { AppDispatch } from "../../app/store";
import styles from "./Auth.module.css";
import {
  asyncTakeToken,
  selectOpenSignIn,
  startSignUp,
  endSignUp,
  startLoading,
  endLoading,
  asyncGetMyProfile,
  selectIsLoading,
  startSignIn,
  endSignIn,
  selectOpenSignUp,
  asyncUserRegister,
  startLogin,
  asyncGetAllProfiles,
  asyncGetFollows,
} from "./authSlice";
import {
  asyncGetAllComments,
  asyncGetAllPosts,
  asyncGetLikes,
} from "../post/postSlice";

const customStyle = {
  position: "absolute" as "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 400,
  bgcolor: "white",
  boxShadow: 24,
  pt: 2,
  pb: 2,
  pr: 3,
  pl: 3,
  outline: "none",
  borderRadius: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const userSchema = Yup.object({
  email: Yup.string()
    .required("Eメールは必須項目です")
    .email("メールアドレスが無効です"),
  password: Yup.string()
    .required("パスワードは必須項目です")
    .min(6, "パスワードは6文字以上です")
    .max(100, "パスワードは100文字以内です"),
});

export const Auth: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openSignIn = useSelector(selectOpenSignIn);
  const openSignUp = useSelector(selectOpenSignUp);
  const isLoading = useSelector(selectIsLoading);
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  return (
    <div>
      <div>
        <Modal
          open={openSignIn}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={customStyle}>
            <h2 className={styles.auth_title}>Twitter</h2>
            <br />
            <h3 className={styles.auth_subtitle}>Twitterにログイン</h3>
            {signInError !== "" && (
              <span
                style={{ fontSize: "13px", color: "red", paddingTop: "13px" }}
              >
                {signInError}
              </span>
            )}
            <br />
            <Formik
              initialValues={{ email: "", password: "" }}
              initialErrors={{ email: "必須項目です" }}
              validationSchema={userSchema}
              onSubmit={async (values) => {
                await dispatch(startLoading());
                const res = await dispatch(asyncTakeToken(values));
                if (asyncTakeToken.fulfilled.match(res)) {
                  window.location.href = "/";
                  await dispatch(asyncGetMyProfile());
                  await dispatch(asyncGetAllProfiles());
                  await dispatch(asyncGetAllPosts());
                  await dispatch(asyncGetAllComments());
                  await dispatch(asyncGetLikes());
                  await dispatch(asyncGetFollows());
                  await dispatch(endSignIn());
                  await dispatch(startLogin());
                  await dispatch(endLoading());
                } else if (asyncTakeToken.rejected.match(res)) {
                  await dispatch(endLoading());
                  await setSignInError("入力情報に誤りがあります");
                  await dispatch(startSignIn());
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              }) => (
                <div className={styles.auth_div}>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.auth_form}>
                      <TextField
                        error={touched.email && errors.email ? true : false}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Eメール"
                        value={values.email}
                        variant="standard"
                        helperText={
                          touched.email && errors.email && errors.email
                        }
                        sx={{ width: "70%" }}
                      />
                      <br />
                      <TextField
                        error={
                          touched.password && errors.password ? true : false
                        }
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="パスワード"
                        value={values.password}
                        variant="standard"
                        helperText={
                          touched.password && errors.password && errors.password
                        }
                        sx={{ width: "70%" }}
                      />
                      <br />
                      <br />
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          variant="contained"
                          disabled={!isValid}
                          type="submit"
                        >
                          ログイン
                        </Button>
                      )}
                      {isLoading ? null : (
                        <span
                          className={styles.autn_text}
                          onClick={async () => {
                            await dispatch(endSignIn());
                            await dispatch(startSignUp());
                          }}
                        >
                          新規登録はこちら
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          </Box>
        </Modal>
        <Modal
          open={openSignUp}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={customStyle}>
            <h2 className={styles.auth_title}>Twitter</h2>
            <br />
            <h3 className={styles.auth_subtitle}>Twitterに登録</h3>
            {signUpError !== "" && (
              <span
                style={{ fontSize: "13px", color: "red", paddingTop: "13px" }}
              >
                {signUpError}
              </span>
            )}
            <br />
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              initialErrors={{
                email: "必須項目です",
                password: "必須項目です",
              }}
              validationSchema={userSchema}
              onSubmit={async (values) => {
                await dispatch(startLoading());
                const res = await dispatch(asyncUserRegister(values));
                if (asyncUserRegister.fulfilled.match(res)) {
                  await dispatch(asyncTakeToken(values));
                  window.location.href = "/";
                  await dispatch(asyncGetMyProfile());
                  await dispatch(asyncGetAllProfiles());
                  await dispatch(asyncGetAllPosts());
                  await dispatch(asyncGetAllComments());
                  await dispatch(asyncGetLikes());
                  await dispatch(asyncGetFollows());
                  await dispatch(endSignUp());
                  await dispatch(startLogin());
                  await dispatch(endLoading());
                } else if (asyncUserRegister.rejected.match(res)) {
                  await dispatch(endLoading());
                  await setSignUpError("このEメールは既に使用されています");
                  await dispatch(startSignUp());
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              }) => (
                <div className={styles.auth_div}>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.auth_form}>
                      <TextField
                        error={touched.email && errors.email ? true : false}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Eメール"
                        value={values.email}
                        variant="standard"
                        helperText={
                          touched.email && errors.email && errors.email
                        }
                        sx={{ width: "70%" }}
                      />
                      <br />
                      <TextField
                        error={
                          touched.password && errors.password ? true : false
                        }
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="パスワード"
                        value={values.password}
                        variant="standard"
                        helperText={
                          touched.password && errors.password && errors.password
                        }
                        sx={{ width: "70%" }}
                      />
                      <br />
                      <br />
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          variant="contained"
                          disabled={!isValid}
                          type="submit"
                        >
                          登録
                        </Button>
                      )}
                      {isLoading ? null : (
                        <span
                          className={styles.autn_text}
                          onClick={async () => {
                            await dispatch(endSignUp());
                            await dispatch(startSignIn());
                          }}
                        >
                          アカウントをお持ちですか？
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
