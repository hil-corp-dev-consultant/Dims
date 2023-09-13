using DIMS.Utility;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DIMS.DataBase
{
    public class Database
    {
        Utility.Utility Util = new Utility.Utility();
        internal DataTable FillDataTable(string commandText, string tableName)
        {
            DataTable dt = new DataTable(tableName);
            using (SqlDataAdapter da = new SqlDataAdapter())
            {
                SqlCommand SqlCmd = new SqlCommand(commandText);

                SqlCmd.CommandTimeout = 5 * 60 * 1000;

                //da.SelectCommand = new SqlCommand(commandText);
                SqlCmd.CommandType = CommandType.Text;
                da.SelectCommand = SqlCmd;
                da.SelectCommand.CommandType = CommandType.Text;
                try
                {
                   // Utility ty = new Utility();
                    da.SelectCommand.Connection = new SqlConnection(Util.ConnectionString);
                    da.Fill(dt);
                }
                catch (Exception ex)
                {
                    Util.LogError(tableName + commandText + ex.Message + ex.StackTrace);
                }
            }
            return dt;
        }

        internal DataSet FillDataSet(string commandText, string tableName)
        {
            DataSet ds = new DataSet();
            using (SqlDataAdapter da = new SqlDataAdapter())
            {
                da.SelectCommand = new SqlCommand(commandText);
                da.SelectCommand.CommandType = CommandType.Text;
                try
                {                    
                    da.SelectCommand.Connection = new SqlConnection(Util.ConnectionString);
                    da.Fill(ds, tableName);
                }
                catch (Exception ex)
                {
                    Util.LogError(tableName + commandText + ex.Message + ex.StackTrace);
                }
            }
            return ds;
        }

        internal int UpdateDataTable(SqlCommand sqlcmd, DataSet ds)
        {
            int resCount = 0;
            sqlcmd.CommandType = CommandType.Text;
            sqlcmd.UpdatedRowSource = UpdateRowSource.None;
            using (SqlDataAdapter da = new SqlDataAdapter())
            {
                try
                {
                   
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        dr.SetAdded();
                    }
                    da.UpdateBatchSize = 100;
                    da.ContinueUpdateOnError = false;
                    da.InsertCommand = sqlcmd;
                    da.InsertCommand.Connection = new SqlConnection(Util.ConnectionString);
                    resCount = da.Update(ds.Tables[0]);
                }
                catch (Exception ex)
                {
                    Util.LogError(sqlcmd + ex.Message + ex.StackTrace);
                }
            }
            return resCount;
        }

        public int ExecuteNonQuery(string query)
        {
            int res = -1;
            try
            {                
                using (SqlConnection conn = new SqlConnection(Util.ConnectionString))
                {
                    SqlCommand command = new SqlCommand(query, conn);
                    command.CommandTimeout = 5 * 60 * 1000;
                    command.CommandType = CommandType.Text;
                    conn.Open();
                    res = command.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                Util.LogError("Database ExecuteNonQuery  error: " + e.Message + "_" + query);
            }
            return res;
        }

        public string ExecuteNonQuery1(string query)
        {
            string DocEntry = "";
            try
            {
                using (SqlConnection conn = new SqlConnection(Util.ConnectionString))
                {
                    SqlDataReader dr = null;
                    SqlCommand command = new SqlCommand(query, conn);
                    command.CommandTimeout = 5 * 60 * 1000;
                    command.CommandType = CommandType.Text;
                    conn.Open();
                    dr = command.ExecuteReader();
                    if (dr != null)
                    {
                        if (dr.Read())
                        {
                            DocEntry = Convert.ToString(dr["DocEntry"]);
                        }
                    }
                    else
                    {
                    }
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                Util.LogError("Database ExecuteNonQuery  error: " + e.Message + "_" + query);
            }
            return DocEntry;
        }

        public string ExecuteNonQuery2(string query, string IdentityName)
        {
            string Result = "";
            try
            {
                using (SqlConnection conn = new SqlConnection(Util.ConnectionString))
                {
                    SqlDataReader dr = null;
                    SqlCommand command = new SqlCommand(query, conn);
                    command.CommandTimeout = 5 * 60 * 1000;
                    command.CommandType = CommandType.Text;
                    conn.Open();
                    dr = command.ExecuteReader();
                    if (dr != null)
                    {
                        if (dr.Read())
                        {
                            Result = Convert.ToString(dr["" + IdentityName + ""]);
                        }
                    }
                    else
                    {
                    }
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                Util.LogError("Database ExecuteNonQuery  error: " + e.Message + "_" + query);
            }
            return Result;
        }

        public object ExecuteScalar(string query)
        {
            SqlConnection conn = new SqlConnection(Util.ConnectionString);
            object result = null;
            try
            {
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    conn.Open();
                    result = myCommand.ExecuteScalar();
                }
            }
            catch (Exception e)
            {
                Util.LogError("Database ExecuteCeScalar error:" + e.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }

        public string ExecuteScalarToReturnString(string query)
        {            
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString());
            string result = null;
            try
            {
                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    conn.Open();
                    object Obj = myCommand.ExecuteScalar();
                    if (Obj == null)
                    {
                        result = "";
                    }
                    else
                    {
                        result = Obj.ToString();
                    }
                }
            }
            catch (Exception e)
            {
                Util.LogError("Database ExecuteCeScalar error:" + e.Message + " \n " + query);
                return "";
            }
            finally
            {
                conn.Close();
            }
            return result;
        }

        public string ExecuteScalarToReturnNumberString(string query)
        {            
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString());
            string result = null;
            try
            {

                using (SqlCommand myCommand = new SqlCommand(query, conn))
                {
                    conn.Open();
                    object Obj = myCommand.ExecuteScalar();
                    if (Obj == null)
                    {
                        result = "0";
                    }
                    else
                    {
                        result = Obj.ToString();
                        if (result == "")
                        {
                            result = "0";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Util.LogError("Database ExecuteCeScalar error:" + e.Message + " \n " + query);
                return "0";
            }
            finally
            {
                conn.Close();
            }
            return result;
        }

        public DataTable ExecuteQuery_SP(string storedProcName, Dictionary<string, SqlParameter> procParameters)
        {
            DataTable dt = new DataTable();            
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString()))
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = storedProcName;
                    // assign parameters passed in to the command
                    foreach (var procParameter in procParameters)
                    {
                        cmd.Parameters.Add(procParameter.Value);
                    }
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }
            }
            return dt;
        }


        #region DIMS_SP

        public string GetStateHeadforCustomer(string CustomerCode)
        {
            string StateHead = string.Empty;
            try
            {
                SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString());

                SqlCommand cmd = new SqlCommand("SHGET", Con);
                cmd.CommandTimeout = 5 * 60 * 1000;
                cmd.Parameters.AddWithValue("@CUSTCODE", CustomerCode);
                //var ReturnParam = cmd.Parameters.Add("@RETURNRD", SqlDbType.VarChar, 50);
                cmd.Parameters.Add("@RETURNRD", SqlDbType.VarChar, 50);
                cmd.Parameters["@RETURNRD"].Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                Con.Open();
                cmd.ExecuteNonQuery();
                StateHead = cmd.Parameters["@RETURNRD"].Value.ToString();
                Con.Close();

                if (StateHead == null || StateHead == "-1")
                {
                    StateHead = "";
                }
            }
            catch (Exception)
            {
                Util.LogError("Error : GetStateHeadforCustomer : CustomerCode" + CustomerCode);
            }
            return StateHead;
        }


        public string GetZonalHeadforCustomer(string CustomerCode)
        {
            string ZonalHead = string.Empty;
            try
            {
                SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString());

                SqlCommand cmd = new SqlCommand("ZHGET", Con);
                cmd.CommandTimeout = 5 * 60 * 1000;
                cmd.Parameters.AddWithValue("@CUSTCODE", CustomerCode);

                cmd.Parameters.Add("@RETURNRD", SqlDbType.VarChar, 50);
                cmd.Parameters["@RETURNRD"].Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                Con.Open();
                cmd.ExecuteNonQuery();
                ZonalHead = cmd.Parameters["@RETURNRD"].Value.ToString();
                Con.Close();

                if (ZonalHead == null || ZonalHead == "-1")
                {
                    ZonalHead = "";
                }
                Con.Close();
            }
            catch (Exception)
            {
                Util.LogError("Error : GetZonalHeadforCustomer : CustomerCode" + CustomerCode);
            }
            return ZonalHead;
        }


        public string SP_GETORGANIZATIONLEVELHEADS(string EMPLOYEECODE)
        {
            string StateHead = string.Empty;
            try
            {
                SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString());

                SqlCommand cmd = new SqlCommand("SP_GETORGANIZATIONLEVELHEADS", Con);
                cmd.Parameters.AddWithValue("@EMPLOYEECODE", EMPLOYEECODE.ToString());
                //var ReturnParam = cmd.Parameters.Add("@RETURNRD", SqlDbType.VarChar, 50);
                cmd.Parameters.Add("@retunrd", SqlDbType.VarChar, 50);
                cmd.Parameters["@retunrd"].Direction = ParameterDirection.Output;
                cmd.CommandType = CommandType.StoredProcedure;

                Con.Open();
                cmd.ExecuteNonQuery();
                StateHead = cmd.Parameters["@retunrd"].Value.ToString();
                Con.Close();

                if (StateHead == null || StateHead == "-1")
                {
                    StateHead = "";
                }
            }
            catch (Exception)
            {
                Util.LogError("Error : SP_GETORGANIZATIONLEVELHEADS : CustomerCode" + EMPLOYEECODE);
            }
            return StateHead;
        }

        #endregion DIMS_SP


    }
}