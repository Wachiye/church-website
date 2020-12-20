export default function Alert( type, title, message)
{
   return(
        <div className={`bottom-right alert alert-${type} alert-dismissible fade show`} role='alert'>
            <h4 className='alert-heading'>{title}</h4>
            <button type='button' className='close'  data-dismiss='alert' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
            </button>
            <p>{message}</p>
        </div>
    )
}