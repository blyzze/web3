import requests
import sys
import json
from datetime import datetime

class MestarAPITester:
    def __init__(self, base_url="https://doc-site-3.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    result["error"] = response.text
                    print(f"   Error Response: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"]

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_health_check(self):
        """Test basic API health check"""
        return self.run_test("API Health Check", "GET", "", 200)

    def test_get_products(self):
        """Test getting product categories"""
        return self.run_test("Get Products", "GET", "products", 200)

    def test_create_quote(self):
        """Test creating a quote request"""
        test_quote = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+90 555 123 4567",
            "company": "Test Company",
            "product_interest": "ALPHA 275",
            "message": "This is a test quote request for automated testing."
        }
        return self.run_test("Create Quote", "POST", "quote", 200, data=test_quote)

    def test_get_quotes(self):
        """Test getting all quotes"""
        return self.run_test("Get Quotes", "GET", "quotes", 200)

    def test_create_quote_minimal(self):
        """Test creating a quote with minimal required fields"""
        minimal_quote = {
            "name": "Minimal Test",
            "email": "minimal@test.com",
            "phone": "+90 555 999 8888",
            "message": "Minimal test quote"
        }
        return self.run_test("Create Quote (Minimal)", "POST", "quote", 200, data=minimal_quote)

    def test_create_quote_invalid(self):
        """Test creating a quote with invalid data"""
        invalid_quote = {
            "name": "",  # Empty name should fail
            "email": "invalid-email",  # Invalid email format
            "phone": "",  # Empty phone
            "message": ""  # Empty message
        }
        # This should return 422 (validation error) or similar
        return self.run_test("Create Quote (Invalid)", "POST", "quote", 422, data=invalid_quote)

def main():
    print("🚀 Starting Mestar Agricultural Equipment API Tests")
    print("=" * 60)
    
    # Setup
    tester = MestarAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Basic health check
    tester.test_health_check()
    
    # Products endpoint
    tester.test_get_products()
    
    # Quote functionality tests
    tester.test_create_quote()
    tester.test_get_quotes()
    tester.test_create_quote_minimal()
    
    # Test invalid data handling
    tester.test_create_quote_invalid()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Show failed tests
    failed_tests = [t for t in tester.test_results if not t["success"]]
    if failed_tests:
        print(f"\n❌ Failed Tests:")
        for test in failed_tests:
            print(f"   - {test['test_name']}: Expected {test['expected_status']}, got {test['actual_status']}")
            if test['error']:
                print(f"     Error: {test['error']}")
    
    # Return appropriate exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())