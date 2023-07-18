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
    public class RondaController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        //Constructor de la clase _context
        public RondaController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listRondas = await _context.Rondas.ToListAsync();
                return Ok(listRondas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("partida/{PartidaId}")]
        public async Task<IActionResult> Get(int PartidaId)
        {
            try
            {
                var rondas = await _context.Rondas.Where(ronda => ronda.PartidaId == PartidaId).ToListAsync();

                if (rondas == null || rondas.Count == 0)
                {
                    return NotFound();
                }

                return Ok(rondas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            try
            {
                var ronda = await _context.Rondas.FindAsync(Id);

                if (ronda == null)
                {
                    return NotFound();
                }

                return Ok(ronda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Ronda ronda)
        {
            try
            {
                if(ronda.P1Move == ronda.P2Move)
                {
                    ronda.RoundResult = "Draw!";
                }
                else if(ronda.P1Move == "scissors" && ronda.P2Move == "paper")
                {
                    ronda.RoundResult = "p1";
                }else if(ronda.P1Move == "paper" && ronda.P2Move == "rock")
                {
                    ronda.RoundResult = "p1";
                }else if(ronda.P1Move == "rock" && ronda.P2Move == "scissors")
                {
                    ronda.RoundResult = "p1";                
                }else if(ronda.P1Move == "paper" && ronda.P2Move == "scissors")
                {
                    ronda.RoundResult = "p2";                
                }else if(ronda.P1Move == "rock" && ronda.P2Move == "paper")
                {
                    ronda.RoundResult = "p2";
                }else if(ronda.P1Move == "scissors" && ronda.P2Move == "rock")
                {
                    ronda.RoundResult = "p2";
                }


                _context.Add(ronda);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetById", new { Id = ronda.Id }, ronda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
