﻿using DamdiServer.Models;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class UserDAL
    {
        private readonly string conStr;
        public UserDAL(string conStr)
        {
            this.conStr = conStr;
        }

        /*Get user from database*/
        public User GetUser(string personal_id, string pass)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    User u = null;
                    string query = $"SELECT * FROM dbo.Users where personal_id = @personal_id AND pass = @pass";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@personal_id", personal_id);
                    cmd.Parameters.AddWithValue("@pass", pass);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        u = new User(Convert.ToString(reader["personal_id"]), Convert.ToString(reader["email"]));
                    }
                    return u;
                }
            }
            catch (Exception)
            {
                throw new Exception("User was not found in the table");
            }

        }

        /*Create a new user in users table*/
        public int SetNewUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    string query = "INSERT INTO dbo.Users (personal_id,email,pass) VALUES (@Personal_id,@Email,@Pass)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = user.Personal_id; //u.Personal_id
                    cmd.Parameters.AddWithValue("@Email", SqlDbType.NVarChar).Value = user.Email; //u.Email
                    cmd.Parameters.AddWithValue("@Pass", SqlDbType.NVarChar).Value = user.Pass;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception)
            {
                throw new Exception("No row effected");
            }
        }

        /*Get user info from database*/
        public UserInfo GetUserInfo(string personal_id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    UserInfo ui = null;
                    string query = $"SELECT * FROM dbo.DonorsInfo where personal_id=@personal_id";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@personal_id", personal_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ui = new UserInfo(Convert.ToString(reader["personal_id"]), 
                            Convert.ToString(reader["first_name"]),
                            Convert.ToString(reader["last_name"]),
                            Convert.ToString(reader["phone"]),
                            Convert.ToString(reader["gender"]),
                            Convert.ToString(reader["birthdate"]),
                            Convert.ToString(reader["prev_first_name"]),
                            Convert.ToString(reader["prev_last_name"]),
                            Convert.ToString(reader["city"]),
                            Convert.ToString(reader["address"]),
                            Convert.ToString(reader["postal_code"]),
                            Convert.ToString(reader["mail_box"]),
                            Convert.ToString(reader["telephone"]),
                            Convert.ToString(reader["work_telephone"]),
                            Convert.ToBoolean(reader["blood_group_member"]),
                            Convert.ToBoolean(reader["personal_insurance"]),
                            Convert.ToBoolean(reader["confirm_examination"]),
                            Convert.ToBoolean(reader["agree_future_don"]),
                            Convert.ToString(reader["birth_land"]),
                            Convert.ToString(reader["aliya_year"]),
                            Convert.ToString(reader["father_birth_land"]),
                            Convert.ToString(reader["mother_birth_land"])
                            );
                    }
                    return ui;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*Create a new user info in donorsinfo table*/
        public int SetNewUserInfo(UserInfo ui)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    string query = "INSERT INTO dbo.DonorsInfo (" +
                        "personal_id," +
                        "first_name," +
                        "last_name," +
                        "phone," +
                        "gender," +
                        "birthdate," +
                        "prev_first_name," +
                        "prev_last_name," +
                        "city," +
                        "address," +
                        "postal_code," +
                        "mail_box," +
                        "telephone," +
                        "work_telephone," +
                        "blood_group_member," +
                        "personal_insurance," +
                        "confirm_examination," +
                        "agree_future_don," +
                        "birth_land," +
                        "aliya_year," +
                        "father_birth_land," +
                        "mother_birth_land" +
                        ") VALUES (" +
                        "@personal_id," +
                        "@first_name," +
                        "@last_name," +
                        "@phone," +
                        "@gender," +
                        "@birthdate," +
                        "@prev_first_name," +
                        "@prev_last_name," +
                        "@city," +
                        "@address," +
                        "@postal_code," +
                        "@mail_box," +
                        "@telephone," +
                        "@work_telephone," +
                        "@blood_group_member," +
                        "@personal_insurance," +
                        "@confirm_examination," +
                        "@agree_future_don," +
                        "@birth_land," +
                        "@aliya_year," +
                        "@father_birth_land," +
                        "@mother_birth_land)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = ui.Personal_id;
                    cmd.Parameters.AddWithValue("@first_name", SqlDbType.NVarChar).Value = ui.First_name; 
                    cmd.Parameters.AddWithValue("@last_name", SqlDbType.NVarChar).Value = ui.Last_name;
                    cmd.Parameters.AddWithValue("@phone", SqlDbType.NVarChar).Value = ui.Phone;
                    cmd.Parameters.AddWithValue("@gender", SqlDbType.NVarChar).Value = ui.Gender;
                    cmd.Parameters.AddWithValue("@birthdate", SqlDbType.Date).Value = ui.Birthdate;
                    cmd.Parameters.AddWithValue("@prev_first_name", SqlDbType.NVarChar).Value = ui.Prev_first_name;
                    cmd.Parameters.AddWithValue("@prev_last_name", SqlDbType.NVarChar).Value = ui.Prev_last_name;
                    cmd.Parameters.AddWithValue("@city", SqlDbType.NVarChar).Value = ui.City;
                    cmd.Parameters.AddWithValue("@address", SqlDbType.NVarChar).Value = ui.Address;
                    cmd.Parameters.AddWithValue("@postal_code", SqlDbType.NVarChar).Value = ui.Postal_code;
                    cmd.Parameters.AddWithValue("@mail_box", SqlDbType.NVarChar).Value = ui.Mail_box;
                    cmd.Parameters.AddWithValue("@telephone", SqlDbType.NVarChar).Value = ui.Telephone;
                    cmd.Parameters.AddWithValue("@work_telephone", SqlDbType.NVarChar).Value = ui.Work_telephone;
                    cmd.Parameters.AddWithValue("@blood_group_member", SqlDbType.Bit).Value = ui.Blood_group_member;
                    cmd.Parameters.AddWithValue("@personal_insurance", SqlDbType.Bit).Value = ui.Personal_insurance;
                    cmd.Parameters.AddWithValue("@confirm_examination", SqlDbType.Bit).Value = ui.Confirm_examination;
                    cmd.Parameters.AddWithValue("@agree_future_don", SqlDbType.Bit).Value = ui.Agree_future_don;
                    cmd.Parameters.AddWithValue("@birth_land", SqlDbType.NVarChar).Value = ui.Birth_land;
                    cmd.Parameters.AddWithValue("@aliya_year", SqlDbType.NVarChar).Value = ui.Aliya_year;
                    cmd.Parameters.AddWithValue("@father_birth_land", SqlDbType.NVarChar).Value = ui.Father_birth_land;
                    cmd.Parameters.AddWithValue("@mother_birth_land", SqlDbType.NVarChar).Value = ui.Mother_birth_land;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception)
            {
                throw new Exception("No row effected");
            }
        }
    }
}