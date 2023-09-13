using DIMS.DataBase;
using System;
using System.Configuration;
using System.Data;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace DIMS.Utility
{
    public class Utility
    {        
        public string ConnectionString = ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ConnectionString;
        private string _logFileFullPath;

        private void setLogFile()
        {
            string path = "logfile" + DateTime.Today.ToString("yyyy-MM-dd") + ".txt";
            string apPath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath;

            _logFileFullPath = apPath + "/" + path;

            if (!File.Exists(_logFileFullPath))
            {
                FileStream fs = null;
                try
                {
                    fs = File.Create(_logFileFullPath);
                }
                catch { throw; }
                finally
                {
                    fs.Close();
                }
            }
        }

        internal void LogError(string errormessage)
        {
            string msg = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " Error: " + errormessage;
            //Check for File creation date and cange the file if date is older than one day
            setLogFile();
            //now write to file"
            using (StreamWriter writer = File.AppendText(_logFileFullPath))
            {
                writer.WriteLine(msg);
                writer.Flush();
            }
        }

        internal void LogMessage(string logmessage)
        {
            string msg = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " Message: " + logmessage;
            //Check for File creation date and cange the file if date is older than one day
            setLogFile();
            //now write to file"
            using (StreamWriter writer = File.AppendText(_logFileFullPath))
            {
                writer.WriteLine(msg);
                writer.Flush();
            }
        }

        public string StreamToString(Stream stream)
        {

            StreamReader reader = new StreamReader(stream);
            string res = reader.ReadToEnd();
            reader.Close();
            reader.Dispose();
            return res;
        }

        public Stream StringtoStream(String inputString)
        {
            byte[] byteArray = Encoding.ASCII.GetBytes(inputString);
            MemoryStream stream = new MemoryStream(byteArray);
            return stream;
        }

        public DateTime ConvertStringtoDatetime(string date)
        {
            DateTime dt;
            try
            {
                string DefaultDateformat = "dd/MM/yyyy";
                if (date.Contains(":"))
                {
                    DefaultDateformat = "dd/MM/yyyy hh:mm";
                }
                else
                {

                }
                string sysUIFormat = CultureInfo.CurrentUICulture.DateTimeFormat.ShortDatePattern;
                string datestring = DateTime.ParseExact(date, DefaultDateformat, CultureInfo.InvariantCulture).ToString(sysUIFormat);
                dt = Convert.ToDateTime(datestring);
            }
            catch (Exception)
            {
                dt = DateTime.Now;

            }
            return dt;
        }


        public string MakeHttpWebRequestToService(string ServiceAddress, string PostData, int TimeOut)
        {
            string ResponseString = string.Empty;
            try
            {
                WebRequest request = WebRequest.Create(ServiceAddress.Trim());
                request.Method = "POST";
                byte[] byteArray = Encoding.UTF8.GetBytes(PostData);
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = byteArray.Length;
                //request.Timeout = TimeOut;
                request.Timeout = TimeOut;
                Stream dataStream = request.GetRequestStream();
                dataStream.Write(byteArray, 0, byteArray.Length);
                dataStream.Close();
                WebResponse response = request.GetResponse();
                string ResultStatus = (((HttpWebResponse)response).StatusDescription);
                dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                ResponseString = reader.ReadToEnd();
                reader.Close();
                dataStream.Close();
                response.Close();
            }
            catch (Exception)
            {
                ResponseString = "FALSE";
            }
            return ResponseString;
        }

        public void SendEMail(string Recipient, string RecvsName, string Subject, string MailBody)
        {
            try
            {

                LogMessage("Recipient : " + Recipient + "\tRecvsName : " + RecvsName + "\tSubject : " + Subject + "\tMailBody" + MailBody);


                if (Recipient == "" || Recipient == null)
                {
                    LogError("Mail cannotb be sent to " + Recipient);
                }
                else
                {
                    string MailHost = string.Empty;
                    string MailPort = string.Empty;
                    string MailSender = string.Empty;
                    string MUserName = string.Empty;
                    string MPassword = string.Empty;


                    DataTable DT = new Database().FillDataTable("SELECT PROPERTY_NAME,VALUE FROM DimsSystemConfiguration", "");

                    if (DT.Rows.Count > 0)
                    {

                        foreach (DataRow Row in DT.Rows)
                        {
                            if (Row["PROPERTY_NAME"].ToString() == "MailHost")
                            {
                                MailHost = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailSender")
                            {
                                MailSender = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailPortNo")
                            {
                                MailPort = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailUserName")
                            {
                                MUserName = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailPassword")
                            {
                                MPassword = Row["VALUE"].ToString();
                            }
                        }

                        if (MailHost == "" || MailHost == null || MailPort == "" || MailPort == null || MailSender == "" || MailSender == null || MUserName == "" || MUserName == null || MPassword == "" || MPassword == null || Recipient == "" || Recipient == null)
                        {
                            LogMessage("Mail Cannot be sent to " + Recipient);
                        }
                        else
                        {
                            SmtpClient smtp = new SmtpClient(MailHost);
                            MailMessage mail = new MailMessage(MailSender, Recipient);
                            mail.IsBodyHtml = true;
                            mail.Subject = "HIL-DIMS :: " + Subject;

                            mail.Body = "Dear " + RecvsName + "<br/><br/>" + MailBody + "<br/><br/><br/>";
                            mail.Body += "<b>Please note:</b> You will not be able to 'Reply' to this email.<br/><br/>";
                            mail.Body += "<b>Please use this link for </b> <a href='https://dims.hil.in' target='_blank'>DIMS</a> <br/><br/>";
                            mail.Body += "For any further queries please write to us at  http://dims.support@hil.in or get in touch with HIL Sales representative of your area.<br/>";
                            mail.Body += "<br/><br/><br/>";
                            mail.Body += "Thank You.<br/>";
                            mail.Body += "<br/>";
                            mail.Body += "Regards,<br/>";
                            mail.Body += "Team HIL Ltd.";

                            smtp.Credentials = new NetworkCredential(MUserName, MPassword);
                            smtp.Port = Convert.ToInt32(MailPort);
                            smtp.EnableSsl = true;
                            smtp.Send(mail);
                            LogMessage("Mail sent to " + Recipient);
                        }
                    }
                    else
                    {

                    }
                }

            }
            catch (Exception e)
            {
                LogError(" Mail : " + e.Message + " \n Recipient : " + Recipient);
            }

        }

    }
}