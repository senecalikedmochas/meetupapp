       public class WatchTwitchController: Controller
       {
        public void WantToBuildDotNetChatbot(bool wantToBuildDotNetChatbot)
        {
            if (wantToBuildDotNetChatbot)
            {
                ViewModel model = ViewModel();
                DateTime d = new DateTime(2018, 04, 11, 06, 30, 00, DateTimeKind.Utc);
                model.Title = "Attend Tech Bytes virtual workshop";
                model.Date = d.ToLongTimeString()
                this.Redirect("http://www.aws.amazon.com/twitch/tech-bytes");
            }
            else
            {
                this.Redirect("http://www.twitch.com/aws");
            }
        }
       }