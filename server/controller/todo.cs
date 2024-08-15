using Microsoft.AspNetCore.Mvc;
using server.model.Entities;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    // Initialize the Todos list
    private static readonly List<Todo> Todos =
    [
        new Todo { Text = "Personal Loans", Key = "1" },
        new Todo { Text = "Unsecured Loans", Key = "2" },
        new Todo { Text = "Student Loans", Key = "3" }
    ];

    // GET: /todo
    [HttpGet]
    public ActionResult<IEnumerable<Todo>> GetTodos()
    {
        return Ok(Todos);
    }

    // POST: /todo
    [HttpPost]
    public ActionResult AddTodo([FromBody] Todo newTodo)
    {
        Console.WriteLine("Received payload: " + JsonConvert.SerializeObject(newTodo));
        if (newTodo == null || string.IsNullOrEmpty(newTodo.Text))
        {
            Console.WriteLine("Invalid todo received: " + JsonConvert.SerializeObject(newTodo));
            return BadRequest("Invalid todo.");
        }

        newTodo.Key = (Todos.Count + 1).ToString();
        Todos.Add(newTodo);
        return CreatedAtAction(nameof(GetTodos), new { id = newTodo.Key }, newTodo);
    }


    // PUT: /todo/{key}
    [HttpPut("{key}")]
    public ActionResult UpdateTodo(string key, [FromBody] Todo updatedTodo)
    {
        var todo = Todos.FirstOrDefault(t => t.Key == key);
        if (todo == null)
        {
            return NotFound(new { message = $"Todo with key {key} not found." });
        }

        todo.Text = updatedTodo.Text;
        return Ok(todo);
    }



    // DELETE: /todo/{key}
    [HttpDelete("{key}")]
    public ActionResult DeleteTodo(string key)
    {
        // Find the todo item by key
        var todo = Todos.FirstOrDefault(t => t.Key == key);
        if (todo == null)
        {
            return NotFound();
        }

        // Remove the todo item from the list
        Todos.Remove(todo);
        return NoContent();
    }
}