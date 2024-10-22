
const Footer = () => {
    return (
        <footer className="bg-black py-10 text-gray-400">
            <div className="container mx-auto px-4 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <p>FAQ</p>
                        <p>Investor Relations</p>
                        <p>Privacy</p>
                        <p>Speed Test</p>
                    </div>
                    <div>
                        <p>Help Center</p>
                        <p>Jobs</p>
                        <p>Cookie Preferences</p>
                        <p>Legal Notices</p>
                    </div>
                    <div>
                        <p>Account</p>
                        <p>Ways to Watch</p>
                        <p>Corporate Information</p>
                        <p>Only on Netflix</p>
                    </div>
                    <div>
                        <p>Media Center</p>
                        <p>Terms of Use</p>
                        <p>Contact Us</p>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-sm">© 2024 Netflix Clone, Inc.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
