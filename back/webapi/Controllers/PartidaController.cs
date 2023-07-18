using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using webapi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartidaController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        //Constructor de la clase _context
        public PartidaController(AplicationDbContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listPartidas = await _context.Partidas.ToListAsync();
                return Ok(listPartidas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var partida = await _context.Partidas.FindAsync(id);

                if (partida == null)
                {
                    return NotFound();
                }

                return Ok(partida);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(Partida partida)
        {
            try
            {
                _context.Add(partida);
                await _context.SaveChangesAsync();
                return CreatedAtAction("Get", new {id =  partida.Id}, partida);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
