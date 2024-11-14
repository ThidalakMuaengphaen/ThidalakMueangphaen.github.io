//1.1
using System;

namespace Firstlab
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("C# programming is easy but I need a lot of practice.");
        }
    }
}

//1.2
using System;

namespace Firstlab
{
    class Program
    {
        static void Main(string[] args)
        {
            string fullName = "Phongsarit Khonsue";
            int id = 66011576;

            Console.WriteLine("Full Name: " + fullName);
            Console.WriteLine("ID: " + id);
        }
    }
}

//1.3
using System;

namespace Firstlab
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("First name : ");
            string firstName = Console.ReadLine();

            Console.WriteLine("Last name : ");
            string lastName = Console.ReadLine();

            Console.WriteLine("Age : ");
            int age = int.Parse(Console.ReadLine());

            Console.WriteLine("Height : ");
            int height = int.Parse(Console.ReadLine());

            // Display the output
            Console.WriteLine($"Your full name is {firstName} {lastName}");
            Console.WriteLine($"Your height is {height} cm and you are {age} years old.");
        }
    }
}
